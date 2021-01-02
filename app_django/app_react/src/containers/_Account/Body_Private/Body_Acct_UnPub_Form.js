import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../../redux/authentication/axios";

import {
    Row,
    Form,
    Input,
    message,
    Col,
    Divider,
} from "antd";
import {
    LoadingOutlined,
    FrownOutlined,
} from "@ant-design/icons";
import Item_Confirm_Form_1x from "../../../components/Item_Confirm_1x";
import Item_Confirm_Form_2x from "../../../components/Item_Confirm_2x";

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const Body_Acct_UnPub_Form = (props) => {
    const [form_email] = Form.useForm();
    const [form_password] = Form.useForm();
    const props_accountId = props.match.params.accountId;
    const userId = useSelector((state) => state.userId);

    async function handleEmailChange(event, contentId) {
        console.log("EVENT: ", event);

        if (event.new_email1 === event.new_email2) {
            let form_data = new FormData();

            form_data.append("id", contentId);
            form_data.append("email", event.email);

            // Log the key/value pairs
            for (var pair of form_data.entries()) {
                console.log(pair[0] + " - " + pair[1]);
            }

            await axios
                .post(
                    //http://localhost:8000/
                    `api/userdj/${props_accountId}/`,
                    form_data,
                    {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    }
                )
                .then((res) => {
                    if (res.status === 200) {
                        message.success(`Successfuly edited user!`);
                        // props.history.push(`/deck/${contentId}`);
                    }
                })
                .catch((error) => console.error(error));
        }
    }

    async function handlePasswordChange(event, contentId) {
        console.log("EVENT: ", event);
        let form_data = new FormData();

        form_data.append("id", contentId);
        form_data.append("new_password1", event.new_password1);
        form_data.append("new_password2", event.new_password2);
        form_data.append("old_password", event.old_password);

        // Log the key/value pairs
        for (var pair of form_data.entries()) {
            console.log(pair[0] + " - " + pair[1]);
        }

        await axios
            .post(`rest-auth/password/change/`, form_data)
            .then((res) => {
                if (res.status === 200) {
                    message.success(`Successfuly changed password!`);
                    // props.history.push(`/deck/${contentId}`);
                }
            })
            .catch((error) => console.error(error));
    }

    async function handleAcctDelete() {
        await axios
            .delete(`api/userdj/${props_accountId}/`)
            .then((res) => {
                if (res.status === 200) {
                    message.success(`Successfuly deleted user!`);
                }
            })
            .catch((error) => console.error(error));
        props.history.push(`/`);
    }

    const [data, setData] = useState(null);
    useEffect(() => {
        axios
            .get(`api/userdj/${props_accountId}/`)
            .then((response) => {
                console.log("RESPONSE: ", response.data);
                setData(response.data);
            })
            .catch((error) => console.error(error));
    }, [props_accountId]);

    return data && data.id && data.id !== userId ? (
        <>
            <p style={{ padding: "20%", fontSize: "25px" }}>
                <FrownOutlined /> You do not own this content, <br />
                <NavLink to="/"> go away! </NavLink>
            </p>
        </>
    ) : (
            <>
                {!data ? (
                    <LoadingOutlined
                        style={{ fontSize: "100px", padding: "10%" }}
                    />
                ) : (
                        <>
                            <Row justify="space-around">
                                <Col
                                    sm={{ span: 10, offset: 2 }}
                                    lg={{ span: 6, offset: 3 }}
                                // style={{ border: "1px black solid" }}
                                >
                                    <Item_Confirm_Form_2x
                                        onClick={() => {
                                            handleAcctDelete();
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Divider type="horizontal" />

                            <Form
                                form={form_email}
                                onFinish={(event) => {
                                    handleEmailChange(event, "update", props_accountId);
                                    form_email.resetFields();
                                }}
                                {...formItemLayout}
                                initialValues={{
                                    email: data.email && data.email,
                                    new_password1: data.password && data.password,
                                }}
                            >
                                <Form.Item
                                    name="new_email1"
                                    label="Email: "
                                    rules={[
                                        {
                                            required: true,
                                            type: "email",
                                            message: "New email is required",
                                        },
                                    ]}
                                >
                                    <Input placeholder={data.email} />
                                </Form.Item>

                                <Form.Item
                                    name="new_email2"
                                    label="Confirm New Email: "
                                    dependencies={["new_email1"]}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please confirm your new email!",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue("new_email1") ===
                                                    value
                                                ) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject(
                                                    "The two emails that you entered do not match!"
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input placeholder={data.email} />
                                </Form.Item>

                                <Item_Confirm_Form_1x
                                    NavLink={`/database/userdj/${props_accountId}`}
                                    Form={form_email}
                                />
                            </Form>

                            <Divider type="horizontal" />

                            <Form
                                form={form_password}
                                onFinish={(event) => {
                                    handlePasswordChange(event, props_accountId);
                                    form_password.resetFields();
                                }}
                                {...formItemLayout}
                                initialValues={{}}
                            >
                                <Form.Item
                                    label="Old Password: "
                                    name="old_password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your old password!",
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    label="New Password: "
                                    name="new_password1"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your new password!",
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="new_password2"
                                    label="Confirm New Password: "
                                    dependencies={["new_password1"]}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please confirm your new password!",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue("new_password1") ===
                                                    value
                                                ) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject(
                                                    "The two passwords that you entered do not match!"
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Item_Confirm_Form_1x
                                    NavLink={`/database/userdj/${props_accountId}`}
                                    Form={form_password}
                                />
                            </Form>
                        </>
                    )}
            </>
        );
};

export default Body_Acct_UnPub_Form;

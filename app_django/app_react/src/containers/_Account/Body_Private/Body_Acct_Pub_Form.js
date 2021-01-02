import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../../redux/authentication/axios";
import { LOCALHOST } from "../../../redux/misc/constants";

import {
    Row,
    Form,
    Input,
    message,
    Modal,
    Select,
    Upload,
    Col,
    Divider,
} from "antd";
import {
    EditOutlined,
    LoadingOutlined,
    FrownOutlined,
} from "@ant-design/icons";
import Item_Confirm_Form_1x from "../../../components/Item_Confirm_1x";

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const Body_Acct_Pub_Form = (props) => {
    const [form] = Form.useForm();

    const props_accountId = props.match.params.accountId;

    var dbSearchTags = useSelector((state) => state.localDBTags);
    const userId = useSelector((state) => state.userId);

    const [visible_submit, setVisible_submit] = useState(false);
    const [valid_name, setValid_name] = useState(true);

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(false);

    const handleFormSubmit = async (event, requestType, contentId) => {
        console.log("EVENT: ", event);
        let form_data = new FormData();

        if (event) {
            form_data.append("id", contentId);
            form_data.append("username", event.name);
            form_data.append("description", event.description);
            form_data.append("tags", event.tags);
            if (iconList && iconList[0] && iconList[0].name !== null)
                form_data.append("icon", iconList[0].originFileObj);

            // Log the key/value pairs
            for (var pair of form_data.entries()) {
                console.log(pair[0] + " - " + pair[1]);
            }
            // return;
        }
        switch (requestType) {
            case "update":
                await axios
                    .put(`api/userdj/${props_accountId}/`, form_data, {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            message.success(`Successfuly edited user!`);
                            // props.history.push(`/deck/${contentId}`);
                        }
                    })
                    .catch((error) => console.error(error));
                break;
        }
    };

    const [data, setData] = useState(null);
    const [iconList, setIconList] = useState(null);
    useEffect(() => {
        axios
            .get(`api/userdj/${props_accountId}/`)
            .then((response) => {
                console.log("RESPONSE: ", response.data);
                setData(response.data);
                response.data.icon &&
                    setIconList([
                        {
                            uid: "-1",
                            name: null,
                            status: "done",
                            url: response.data.icon,
                        },
                    ]);
            })
            .catch((error) => console.error(error));
    }, []);

    function onChange_Icon(fileList) {
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //     message.error("Image must smaller than 2MB!");
        // }
        const image_formats = ["image/png", "image/jpeg", "image/pjpeg"];
        fileList = fileList.slice(-1)[0];
        console.log(fileList);
        if (image_formats.includes(fileList.type)) setIconList([fileList]);
    }

    return data && data.id && data.id != userId ? (
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
                            <Form
                                form={form}
                                onFinish={(event) => {
                                    setVisible_submit(false);
                                    handleFormSubmit(event, "update", props_accountId);
                                }}
                                {...formItemLayout}
                                initialValues={{
                                    name: data.username && data.username,
                                    description: data.description && data.description,
                                    tags:
                                        data.tags &&
                                        data.tags.map((tag) => {
                                            return tag.name;
                                        }),
                                }}
                            >
                                <Row justify="space-around">
                                    <Col
                                        sm={{ span: 10, offset: 2 }}
                                        lg={{ span: 6, offset: 3 }}
                                    // style={{ border: "1px black solid" }}
                                    >
                                        <Item_Confirm_Form_1x
                                            NavLink={`/account/${props_accountId}`}
                                            Form={form}
                                        />
                                    </Col>
                                </Row>

                                <Divider type="horizontal" />

                                <Row justify="center">
                                    <span
                                        style={{
                                            width: "300px",
                                            // border: "1px solid black",
                                        }}
                                    >
                                        <Upload
                                            accept="image/x-png,image/jpeg"
                                            listType="picture-card"
                                            fileList={iconList}
                                            beforeUpload={() => false}
                                            onPreview={(file) => {
                                                setPreviewImage(file.url);
                                                setPreviewVisible(true);
                                            }}
                                            onChange={(event) => {
                                                onChange_Icon(event.fileList);
                                            }}
                                        >
                                            <EditOutlined />
                                        </Upload>

                                        <Modal
                                            visible={previewVisible}
                                            footer={null}
                                            onCancel={() => setPreviewVisible(false)}
                                        >
                                            <img
                                                alt="example"
                                                style={{ width: "100%" }}
                                                src={previewImage}
                                            />
                                        </Modal>
                                    </span>
                                </Row>

                                <Form.Item
                                    name="name"
                                    label="Name: "
                                    rules={[
                                        {
                                            required: true,
                                            message: "You need a non-numeric name.",
                                            isNumeric: false,
                                        },
                                    ]}
                                    validateStatus={valid_name ? null : "error"}
                                    help={
                                        valid_name
                                            ? null
                                            : "You need a non-numeric name."
                                    }
                                >
                                    <Input
                                        onChange={(e) => {
                                            isNaN(e.target.value)
                                                ? setValid_name(true)
                                                : setValid_name(false);
                                        }}
                                        placeholder={data.name}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="tags"
                                    label="Tags"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please select tags for your content!",
                                            type: "array",
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder={
                                            data.tags &&
                                            data.tags.map((tag) => {
                                                return `${tag.name} _ `;
                                            })
                                        }
                                    >
                                        {dbSearchTags &&
                                            dbSearchTags.map((tag) => (
                                                <Option key={tag.id} value={tag.name}>
                                                    {tag.name}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="description"
                                    label="Description:"
                                    rules={[
                                        {
                                            required: true,
                                            message: "You need a description.",
                                        },
                                    ]}
                                >
                                    <Input placeholder={data.description} />
                                </Form.Item>
                            </Form>
                        </>
                    )}
            </>
        );
};

export default Body_Acct_Pub_Form;

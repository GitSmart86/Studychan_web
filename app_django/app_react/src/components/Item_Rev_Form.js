import { useSelector, } from "react-redux";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, Rate } from "antd";

import axios from "../redux/authentication/axios";

import {
    FormOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

const Item_Rev_Form = (props) => {
    const [form] = Form.useForm();
    const userId = useSelector((state) => state.userId);
    const [visible_rev_self, setVisible_rev_self] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get(`api/rev_${props.reviewedPhylum}/`, {
                params: {
                    mode: "personal",
                    reviewedId: props.reviewedId,
                    reviewerId: userId,
                },
            })
            .then((response) => {
                console.log("Personal Rev RESPONSE: ", response.data);
                setData(response.data[0]);
            })
            .catch((error) => console.error(error));
    }, []);

    const Post_Review = async (event) => {
        const qsData = {
            stars: event.stars,
            description: event.description,
        };

        switch (props.reviewedPhylum) {
            case "deck":
                qsData["reviewedDeck"] = props.reviewedId;
                qsData["reviewingUser_Deck"] = userId;
                break;

            case "groupdeck":
                qsData["reviewedGroupdeck"] = props.reviewedId;
                qsData["reviewingUser_Groupdeck"] = userId;
                break;

            case "note":
                qsData["reviewedNote"] = props.reviewedId;
                qsData["reviewingUser_Note"] = userId;
                break;

            default:
                break;
        }

        if (data && data.id) {
            axios
                .put(`api/rev_${props.reviewedPhylum}/${data.id}/`, qsData)
                .then((response) => {
                    console.log("Rev PUT RESPONSE: ", response.data);
                })
                .catch((error) => console.error(error));
            return;
        } else {
            axios
                .post(`api/rev_${props.reviewedPhylum}/`, qsData)
                .then((response) => {
                    console.log("Rev POST RESPONSE: ", response.data);
                })
                .catch((error) => console.error(error));
            return;
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setVisible_rev_self(true)}>
                <FormOutlined />
                Review
            </Button>

            <Modal
                title="Review"
                visible={visible_rev_self}
                onOk={() => setVisible_rev_self(false)}
                onCancel={() => setVisible_rev_self(false)}
                footer={[]}
            >
                <Form
                    form={form}
                    onFinish={(event) => Post_Review(event)}
                    initialValues={{
                        starts: data && data.stars,
                        description: data && data.description,
                    }}
                >
                    <p>
                        {data &&
                            "Reviewed on: " +
                            data.timestamp_updated.toString().split("T")[0]}
                    </p>
                    <Form.Item
                        name="stars"
                        rules={[
                            {
                                required: true,
                                message: "Please give a star rating",
                            },
                        ]}
                    >
                        <Rate
                            // style={{ fontSize: 12 }}
                            allowClear={true}
                            defaultValue={data && data.stars}
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please give a description to your rating",
                            },
                        ]}
                    >
                        <TextArea rows="5" placeholder="input description here" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => setVisible_rev_self(false)}
                        >
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Item_Rev_Form;

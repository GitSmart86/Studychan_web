import { useSelector } from "react-redux";
import React, { useState } from "react";

// import useWindowDimensions from "../redux/misc/windowDimensions";
// import { RESPONSIVE_WIDTH } from "../redux/misc/constants";
import axios from "../redux/authentication/axios";

import {
    Form,
    Button,
    Input,
    Select,
    message,
    Upload,
    Divider,
    Row,
} from "antd";
import { PlusOutlined, PictureOutlined } from "@ant-design/icons";

const { Option, OptGroup } = Select;
const { Dragger } = Upload;

const Item_Feedback_Form = (props) => {
    const [fileList_Img, setFileList_Img] = useState(null);

    const [form] = Form.useForm();
    const userId = useSelector((state) => state.userId);

    function onChange_Junct_Img(fileList) {
        const image_formats = [
            "image/png",
            "image/jpeg",
            "image/pjpeg",
            "image/gif",
        ];
        let newFileList = [];
        fileList.map((file) => {
            // console.log(file.type);
            if (image_formats.includes(file.type)) newFileList.push(file);
        });
        setFileList_Img(newFileList);
    }

    const Post_Review = async (event) => {
        let form_data = new FormData();

        if (fileList_Img !== null) {
            fileList_Img.map((img) => {
                if (img.noChange && img.noChange === true) {
                    var newFile = new File([], img.name, {
                        type: "noChange",
                    });
                    form_data.append(img.name, newFile);
                } else {
                    form_data.append(img.originFileObj.name, img.originFileObj);
                }
            });
        }

        form_data.append("topic", event.topic);
        form_data.append("defcon", event.defcon);
        form_data.append("feedback_owner", userId);
        form_data.append("name", event.name);
        form_data.append("description", event.description);

        // Log the key/value pairs
        for (var pair of form_data.entries()) {
            console.log(pair[0] + " - " + pair[1]);
        }

        // const qsData = {
        //     feedback_owner: userId,
        //     topic: event.topic,
        //     defcon: event.defcon,
        //     name: event.name,
        //     description: event.description,
        // };

        axios
            .post(`api/feedback/`, form_data)
            .then((response) => {
                console.log("Q/A POST RESPONSE: ", response.data);
                // setVisible_ask(false);
                form.resetFields();
                message.success("Sent Feedback!");
            })
            .catch((error) => {
                console.error(error);
                if (error.response) {
                    const msg = error.response.status + "";
                    console.log(msg);
                    if (msg.startsWith("4")) {
                        message.warning(
                            "An error occured on your webpage, and the message could not be sent!"
                        );
                    }
                    if (msg.startsWith("5")) {
                        message.warning(
                            "An error occured on the website server, and the message could not be sent!"
                        );
                    }
                }
                // if (error.response) {
                //     console.log(error.response.data);
                //     console.log(error.response.status);
                //     console.log(error.response.headers);
                // }
            });
    };

    return (
        <>
            <Form
                form={form}
                onFinish={(event) => Post_Review(event)}
                initialValues={
                    {
                        // starts: data && data.stars,
                        // description: data && data.description,
                    }
                }
            >
                <Form.Item
                    name="topic"
                    label="Topic: "
                    rules={[
                        {
                            required: true,
                            message: "Please give a description to your rating",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <OptGroup label="Specific: ">
                            <Option value="USER">User Account</Option>
                            <Option value="CCPICK">ccPicks</Option>
                            <Option value="DECK">Decks</Option>
                            <Option value="FORMAT">Formats</Option>
                            <Option value="GROUPDECK">Groupdecks</Option>
                            <Option value="NOTE">Notes</Option>
                            <Option value="STORE">Store</Option>
                        </OptGroup>

                        <OptGroup label="General: ">
                            <Option value="GEN_EXE">About Desktop App</Option>
                            <Option value="GEN_APK">About Mobile App</Option>
                            <Option value="GEN_WEB">About Website</Option>
                        </OptGroup>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="defcon"
                    label="Urgency: "
                    rules={[
                        {
                            required: true,
                            message: "Please give a description to your rating",
                        },
                    ]}
                >
                    <Select>
                        <Option value="POSITIVE">Positive Feedback</Option>
                        <Option value="HELP">Question</Option>
                        <Option value="BUG">Cosmetic Bug</Option>
                        <Option value="CRASH">Operational Bug</Option>
                        <Option value="DANGER">Major Error</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Question Title: "
                    rules={[
                        {
                            required: true,
                            message: "Please give a star rating",
                        },
                    ]}
                >
                    <Input placeholder="input description here" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description: "
                    rules={[
                        {
                            required: true,
                            message: "Please give a description to your rating",
                        },
                    ]}
                >
                    <Input placeholder="input description here" />
                </Form.Item>

                <Dragger
                    accept="image/x-png,image/gif,image/jpeg"
                    multiple={true}
                    listType="picture"
                    fileList={fileList_Img}
                    onChange={(event) => onChange_Junct_Img(event.fileList)}
                    beforeUpload={() => false}
                    style={
                        {
                            // width: "50%",
                        }
                    }
                >
                    <Row align="middle" justify="center">
                        <PlusOutlined style={{ fontSize: "16px" }} />
                        <PictureOutlined style={{ fontSize: "24px" }} />
                    </Row>
                </Dragger>

                <Divider type="horizontal" />

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Send
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Item_Feedback_Form;

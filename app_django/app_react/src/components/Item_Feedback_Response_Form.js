import { useSelector } from "react-redux";
import React, { useState } from "react";

import axios from "../redux/authentication/axios";

import { Form, Button, Input, message, Row, Upload } from "antd";
import { PlusOutlined, PictureOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { TextArea } = Input;

const Item_Feedback_Response_Form = (props) => {
    const [form] = Form.useForm();
    const userId = useSelector((state) => state.userId);
    const [fileList_Img, setFileList_Img] = useState(null);

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

        form_data.append("feedback_response_owner", userId);
        form_data.append("ori_feedback", props.parent_id);
        form_data.append("isPublished", true);
        form_data.append("description", event.description);

        // Log the key/value pairs
        for (var pair of form_data.entries()) {
            console.log(pair[0] + " - " + pair[1]);
        }

        axios
            .post(`api/feedback_response/`, form_data)
            .then((response) => {
                console.log("Response POST RESPONSE: ", response.data);
                form.resetFields();
                message.success("Sent Feedback!");

                props.fetchResponses();
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
            <Form form={form} onFinish={(event) => Post_Review(event)}>
                <Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Reply
                        </Button>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Enter a reply here.",
                            },
                        ]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="input description here"
                        />
                    </Form.Item>

                    <Dragger
                        accept="image/x-png,image/gif,image/jpeg"
                        multiple={true}
                        listType="picture"
                        fileList={fileList_Img}
                        onChange={(event) => onChange_Junct_Img(event.fileList)}
                        beforeUpload={() => false}
                        style={{
                            width: "100px",
                            height: "100px",
                        }}
                    >
                        <Row align="middle" justify="center">
                            <PlusOutlined style={{ fontSize: "16px" }} />
                            {/* <FileImageOutlined style={{ fontSize: "24px" }} /> */}
                            <PictureOutlined style={{ fontSize: "24px" }} />
                        </Row>
                    </Dragger>
                </Row>
            </Form>
        </>
    );
};

export default Item_Feedback_Response_Form;

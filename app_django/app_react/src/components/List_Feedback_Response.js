import React from "react";
import { useSelector, } from "react-redux";
import { LOCALHOST } from "../redux/misc/constants";

import {
    Divider,
    Row,
    Col,
    Upload,
    Modal,
    Button,
    message,
} from "antd";
// import { RightCircleTwoTone, EditOutlined } from "@ant-design/icons";

import axios from "../redux/authentication/axios";
// import { LOCALHOST } from "../redux/misc/constants";
import { useEffect, useState } from "react";
import Item_Feedback_Response_Form from "./Item_Feedback_Response_Form";

const List_Feedback_Response = (props) => {
    const userId = useSelector((state) => state.userId);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const [data, setData] = useState(null);

    function fetchResponses() {
        axios
            .get(`api/feedback_response/?parent_feedback_id=${props.parent_id}`)
            .then((response) => {
                console.log("RESPONSE: ", response.data);
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => fetchResponses(), []);

    function formatImages(imageList) {
        let resultList = [];

        imageList.length > 0 &&
            imageList.map((jpg) => {
                resultList.push({
                    uid: resultList.length,
                    name: jpg.name,
                    status: "done",
                    url: jpg.img,
                    type: "image/jpeg",
                });
            });
        console.log("end imagelists: ", resultList);
        return resultList;
    }

    async function Delete_Feedback_Response(id) {
        if (userId == id) {
            await axios
                .delete(`api/feedback_response/${id}/`)
                .then((res) => {
                    if (res.status === 200) {
                        message.success(`Successfuly deleted Response!`);
                    }
                })
                .catch((error) => console.error(error));

            fetchResponses();
        }
    }

    return (
        <>
            {data && (
                <>
                    {data.map((item) => {
                        console.log(item);
                        return (
                            <>
                                <Divider type={"horizontal"} />

                                <Col offset={2}>
                                    <Row justify={"space-between"}>
                                        <b>{`${item.feedback_response_owner}: `}</b>
                                        <p>
                                            {
                                                item.timestamp
                                                    .toString()
                                                    .split("T")[0]
                                            }
                                        </p>
                                        {console.log(
                                            item.feedback_response_owner.id
                                        )}
                                        {userId ==
                                            item.feedback_response_owner.id && (
                                                <Button
                                                    onClick={() =>
                                                        Delete_Feedback_Response(
                                                            item.id
                                                        )
                                                    }
                                                    type="danger"
                                                >
                                                    Delete
                                                </Button>
                                            )}
                                    </Row>
                                </Col>

                                <Row>
                                    <p>{item.description}</p>
                                    <Upload
                                        listType="picture-card"
                                        fileList={formatImages(
                                            item.feedback_response_img
                                        )}
                                        beforeUpload={() => false}
                                        onPreview={(file) => {
                                            setPreviewImage(file.url);
                                            setPreviewVisible(true);
                                        }}
                                    ></Upload>

                                    <Modal
                                        visible={previewVisible}
                                        footer={null}
                                        onCancel={() =>
                                            setPreviewVisible(false)
                                        }
                                    >
                                        <img
                                            alt="__image__"
                                            style={{ width: "100%" }}
                                            src={previewImage}
                                        />
                                    </Modal>
                                </Row>
                            </>
                        );
                    })}
                </>
            )}

            <Divider type={"horizontal"} />

            <Row>
                {/* <Divider type={"vertical"} /> */}
                <Item_Feedback_Response_Form
                    parent_id={props.parent_id}
                    fetchResponses={() => fetchResponses()}
                />
            </Row>
        </>
    );
};

export default List_Feedback_Response;

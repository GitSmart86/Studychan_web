import React from "react";
import { useSelector, } from "react-redux";

import { Row, Collapse, Col, Modal, Upload } from "antd";
// import { RightCircleTwoTone, EditOutlined } from "@ant-design/icons";

import axios from "../redux/authentication/axios";
import { useEffect, useState } from "react";
import List_Feedback_Response from "./List_Feedback_Response";

const { Panel } = Collapse;

const List_Feedback = (props) => {
    const userId = useSelector((state) => state.userId);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const [data, setData] = useState(null);
    useEffect(() => {
        axios
            .get(`api/feedback/?owner_id=${userId}`)
            .then((response) => {
                console.log("RESPONSE: ", response.data);
                setData(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

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

    return (
        data && (
            <>
                <Collapse defaultActiveKey={[]}>
                    {data.map((item) => {
                        return (
                            <Panel
                                header={<p>{`Title -  ${item.name}`}</p>}
                                key={item.timestamp}
                            >
                                <Row>
                                    <Col offset={0}>
                                        <b>{`${item.defcon} - ${item.topic}`}</b>
                                    </Col>
                                    <Col offset={3}>
                                        <p>
                                            {
                                                item.timestamp
                                                    .toString()
                                                    .split("T")[0]
                                            }
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <p>{item.description}</p>
                                    <Upload
                                        listType="picture-card"
                                        fileList={formatImages(
                                            item.feedback_img
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

                                <Row>
                                    {/* <Divider type={"vertical"} /> */}
                                    <Col offset={2}>
                                        <List_Feedback_Response
                                            parent_id={item.id}
                                        />
                                    </Col>
                                </Row>
                            </Panel>
                        );
                    })}
                </Collapse>

                {/* <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            // console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.title} actions={[]} extra={<></>}>
                            <List.Item.Meta
                                avatar={item.timestamp.toString().split("T")[0]}
                                title={item.name}
                                description={`${item.defcon} - ${item.topic}`}
                            />
                            {item.description}

                            <Divider type={"horizontal"} />
                            <Row style={{ width: "100%" }}>
                                <Divider type={"vertical"} />
                                <List_Feedback_Response
                                    owner_id={props.owner_id}
                                />
                            </Row>
                        </List.Item>
                    )}
                /> */}
            </>
        )
    );
};

export default List_Feedback;

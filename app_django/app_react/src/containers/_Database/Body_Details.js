import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    Avatar,
    Space,
    Progress,
    Button,
    Row,
    Drawer,
    Divider,
    Typography,
    message,
} from "antd";
import {
    LikeOutlined,
    DislikeOutlined,
    BellOutlined,
    EditOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import { LOCALHOST } from "../../redux/misc/constants";

// import * as actions from "../redux/authentication/actions/auth";
import axios from "../../redux/authentication/axios";
import List_Tag from "../../components/List_Tag";
import List_Rev from "../../components/List_Rev";
import List_Sample from "../../components/List_Sample";
import Item_Rev_Form from "../../components/Item_Rev_Form";


// const { Text, Link } = Typography;

const Body_Details = (props) => {
    const content_id = props.match.params.id;
    const content_phylum = props.match.params.phylum;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        console.log("RESIZE");
        window.dispatchEvent(new Event("resize"));
    }, []);

    const userId = useSelector((state) => state.userId);
    const [data, setData] = useState(null);
    const [cnt_subs, setCnt_subs] = useState(0);
    const [cnt_likes, setCnt_likes] = useState(0);
    const [cnt_dislikes, setCnt_dislikes] = useState(0);
    const [u_subbed, setU_subbed] = useState(0);
    const [u_liked, setU_liked] = useState(0);
    useEffect(() => {
        axios
            .get(`api/${content_phylum}/${content_id}/`)
            .then((response) => {
                console.log("RESPONSE: ", response.data);
                setData(response.data);

                if (response.data) {
                    setCnt_likes(response.data.posRating_cnt)
                    setCnt_dislikes(response.data.negRating_cnt)
                    setU_subbed(response.data.u_subbed)
                    setU_liked(response.data.u_liked)
                }
                if (response.data.sub_cnt) {
                    setCnt_subs(response.data.sub_cnt)
                }
            })
            .catch((error) => console.error(error));
    }, []);

    function viewerAction(type) {
        let request = "";

        switch (type) {
            case "sub":
                request = `api/${content_phylum}/${content_id}/subscribe`;
                break;
            case "like":
                request = `api/${content_phylum}/${content_id}/rate/pos`;
                break;
            case "dislike":
                request = `api/${content_phylum}/${content_id}/rate/neg`;
                break;
            default:
                break;
        }
        console.log(type);

        axios
            .post(request)
            .then((response) => {
                console.log("RESPONSE: ", response.data);

                switch (type) {
                    case "sub":
                        if (response.data === "subscribed") {
                            setCnt_subs(cnt_subs + 1)
                            setU_subbed(1)
                        }
                        else {
                            setCnt_subs(cnt_subs - 1)
                            setU_subbed(0)
                        }
                        break;

                    case "like":
                        if (response.data === "liked") {
                            setCnt_likes(cnt_likes + 1)
                            setU_liked(1)
                        }
                        else if (response.data === "nulled like") {
                            setCnt_likes(cnt_likes - 1)
                            setU_liked(0)
                        }
                        else {
                            setCnt_likes(cnt_likes + 1)
                            setCnt_dislikes(cnt_dislikes - 1)
                            setU_liked(1)
                        }
                        break;

                    case "dislike":
                        if (response.data === "disliked") {
                            setCnt_dislikes(cnt_dislikes + 1)
                            setU_liked(-1)
                        }
                        else if (response.data === "nulled dislike") {
                            setCnt_dislikes(cnt_dislikes - 1)
                            setU_liked(0)
                        }
                        else {
                            setCnt_dislikes(cnt_dislikes + 1)
                            setCnt_likes(cnt_likes - 1)
                            setU_liked(-1)
                        }
                        break;

                    default:
                        break;
                }
            })
            .catch((error) => {
                if (error.message.includes("401")) {
                    message.warn(
                        "You must signin first!"
                    );
                }
                console.error(error)
            });
    }

    const [visible_sample, setVisible_sample] = useState(false);
    const [visible_rev, setVisible_rev] = useState(false);

    return data ? (
        <div
            style={{
                padding: "15px 25px 15px 15px",
                // background: "rgba(150, 150, 150, 0.2)",
            }}>
            <Space>
                <Avatar size={64} src={data.icon ? data.icon : null} />
                <span>{data.name}</span>

                <Divider type="vertical" />

                <span>
                    By:
                    <Link to={`/account/${data.owner}`}>
                        {" "}
                        {data.owner_name}
                    </Link>
                </span>

                {userId == data.owner && (
                    <Button>
                        <Link
                            to={`/database/${content_phylum}/${content_id}/edit`}
                        >
                            Edit <EditOutlined />
                        </Link>
                    </Button>
                )}
            </Space>

            <Row>
                {data.sub_cnt >= 0 ? (
                    u_subbed ? (
                        <Space size="middle">
                            <Button type="primary" danger
                                onClick={() => viewerAction("sub")}
                            >
                                Subscribers: {cnt_subs}
                                <BellOutlined />
                            </Button>
                        </Space>
                    ) : (
                            <Space size="middle">
                                <Button danger
                                    onClick={() => viewerAction("sub")}
                                >
                                    Subscribers: {cnt_subs}
                                    <BellOutlined />
                                </Button>
                            </Space>
                        )
                ) : null}

                <div style={{ width: 20, paddingTop: 60 }}></div>
                <Space direction="horizontal" size="small">

                    {u_liked == 1 ? (
                        <Button style={{ background: "", borderColor: "#0099ff", color: "#0099ff" }}
                            onClick={() => viewerAction("like")}
                        >
                            {cnt_likes} <LikeOutlined />
                        </Button>
                    ) : (
                            <Button onClick={() => viewerAction("like")}>
                                {cnt_likes} <LikeOutlined />
                            </Button>
                        )}

                    <div style={{ width: 150 }}>
                        <Progress
                            percent={
                                (cnt_likes /
                                    (cnt_likes + cnt_dislikes)) *
                                100
                            }
                            size="small"
                            showInfo={false}
                            strokeColor={"green"}
                            trailColor={"red"}
                        />
                    </div>

                    {u_liked == -1 ? (
                        <Button style={{ background: "", borderColor: "#0099ff", color: "#0099ff" }}
                            onClick={() => viewerAction("dislike")}
                        >
                            {cnt_dislikes} <DislikeOutlined />
                        </Button>
                    ) : (
                            <Button onClick={() => viewerAction("dislike")}>
                                {cnt_dislikes} <DislikeOutlined />
                            </Button>
                        )}
                </Space>

                <Divider type="horizontal" />

                {data.tags && data.tags.length > 0 ? <List_Tag tags={data.tags} /> : null}
            </Row>

            <Row>
                {data.sample ? (
                    <>
                        <Button
                            type="primary"
                            onClick={() => setVisible_sample(true)}
                        >
                            Details
                        </Button>
                        <Drawer
                            title="Details"
                            placement="right"
                            closable={false}
                            onClose={() => setVisible_sample(false)}
                            visible={visible_sample}
                        >
                            <List_Sample />
                        </Drawer>
                    </>
                ) : null}

                {data.format_type ? (
                    <div style={{ padding: 10 }}>
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => setVisible_rev(true)}
                        >
                            Reviews
                        </Button>

                        <Drawer
                            title={
                                <Row justify="space-around">
                                    <span> Reviews: </span>
                                    <Button onClick={() => setVisible_rev(false)}>
                                        <CloseOutlined />
                                    </Button>
                                </Row>
                            }
                            placement="right"
                            closable={false}
                            onClose={() => setVisible_rev(false)}
                            visible={visible_rev}
                            width={400}
                        >
                            <Item_Rev_Form
                                reviewedId={content_id}
                                reviewedPhylum={content_phylum}
                            />

                            {data.id && (
                                <List_Rev
                                    phylumId={data.id}
                                    phylum={content_phylum}
                                />
                            )}
                        </Drawer>
                    </div>
                ) : null}
            </Row>
            <Space>
                <Typography.Text>{data.description}</Typography.Text>
            </Space>
        </div >
    ) : null;
};

export default Body_Details;

import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { Avatar, Space, Button, Divider, message, } from "antd";
import { Link } from "react-router-dom";
import {
    BellOutlined,
    LikeOutlined,
    EditOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import List_Tag from "../../../components/List_Tag";
import axios from "../../../redux/authentication/axios";
import { LOCALHOST } from "../../../redux/misc/constants";

const Body_Acct_Pub = (props) => {
    const userId = useSelector((state) => state.userId);

    const [data, setData] = useState(null);
    const [cnt_subs, setCnt_subs] = useState(0);
    const [cnt_likes, setCnt_likes] = useState(0);
    const [u_subbed, setU_subbed] = useState(0);
    const [u_liked, setU_liked] = useState(0);
    useEffect(() => {
        axios
            // .get(`api/userdj/${accountId}`)
            .get(`api/obtainuserdata/?id=${props.accountId}&asker_id=${userId}`)
            .then((response) => {
                console.log("RESPONSE:", response.data);
                setData(response.data);

                if (response.data) {
                    setCnt_subs(response.data.userData.subscribers_cnt)
                    setCnt_likes(response.data.userData.posRatings_cnt)
                    setU_subbed(response.data.userData.u_subbed)
                    setU_liked(response.data.userData.u_liked)
                }

            });
    }, []);

    function viewerAction(type) {
        let request = "";

        switch (type) {
            case "sub":
                request = `api/user/${data.userData.id}/subscribe`;
                break;
            case "like":
                request = `api/user/${data.userData.id}/rate/pos`;
                break;
            default:
                break;
        }

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
                        else {
                            setCnt_likes(cnt_likes - 1)
                            setU_liked(0)
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

    return !data || !data.userData ? (
        <LoadingOutlined style={{ fontSize: "100px", padding: "10%" }} />
    ) : (
            <div style={{ padding: "20px 20px 20px 20px" }}>
                <Space direction="vertical">
                    <Space align="baseline">
                        <Avatar size={64} src={LOCALHOST + data.userData.icon} />
                        <span>{data.userData.username}</span>

                        <Divider type="vertical" />

                        <span>
                            Member since{" "}
                            {Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                // month: "short",
                                // day: "2-digit",
                            }).format(data.userData.date_Joined)}
                        </span>

                        {userId == data.userData.id && (
                            <Button>
                                <Link
                                    to={`/account/${data.userData.id}/public/edit`}
                                >
                                    <EditOutlined /> Edit
                            </Link>
                            </Button>
                        )}
                    </Space>

                    <Space align="center">
                        {data.userData.subscribers_cnt >= 0 ? (
                            u_subbed ? (
                                <Button type="primary" danger
                                    onClick={() => viewerAction("sub")}
                                >
                                    Subscribers: {cnt_subs}
                                    <BellOutlined />
                                </Button>
                            ) : (
                                    <Button danger
                                        onClick={() => viewerAction("sub")}
                                    >
                                        Subscribers: {cnt_subs}
                                        <BellOutlined />
                                    </Button>
                                )
                        ) : null}

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
                        {/* <span>Subscribers: {cnt_subs} </span>
                        <Button onClick={() => viewerAction("sub")}>
                            <BellOutlined />
                        </Button> */}

                        {/* <span>Likes: {cnt_likes} </span>
                        <Button onClick={() => viewerAction("like")}>
                            <LikeOutlined />
                        </Button> */}
                    </Space>

                    <Divider direction="horizontal" />

                    <Space>
                        <List_Tag tags={data.userTags && data.userTags} />
                    </Space>

                    <Space>
                        <p>{data.userData.description}</p>
                    </Space>
                </Space>
            </div>
        );
};

export default Body_Acct_Pub;

import React from "react";
import { Link } from "react-router-dom";

import { List, Avatar, Row, Divider, Space } from "antd";
import {
    LikeOutlined,
    BellOutlined,
} from "@ant-design/icons";
import { LOCALHOST } from "../redux/misc/constants";

import List_Tag from "./List_Tag";

const List_User = (props) => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    // console.log(page);
                },
                pageSize: 5,
            }}
            dataSource={props.data}
            renderItem={(item) => (
                <List.Item key={item.title}>
                    <List.Item.Meta
                        avatar={
                            <Link to={`/account/${item.id}`}>
                                <Avatar
                                    size={64}
                                    src={item.icon ? LOCALHOST + item.icon : null}
                                />
                            </Link>
                        }
                        title={
                            <Link to={`/account/${item.id}`}>
                                {item.username}
                            </Link>
                        }
                    />
                    <Row>
                        {item.subscribers_cnt >= 0 && (
                            <>
                                {item.u_subbed == 1 ? (
                                    <Space align="start" style={{ color: "red" }}>
                                        <p>{`Subscribers: ${item.subscribers_cnt}`}</p>
                                        <BellOutlined />
                                    </Space>
                                ) : (
                                        <Space align="start">
                                            <p>{`Subscribers: ${item.subscribers_cnt}`}</p>
                                            <BellOutlined />
                                        </Space>
                                    )}

                            </>
                        )}
                        <>
                            <Divider type="vertical"></Divider>

                            {item.u_liked == 1 ? (
                                <Space align="start" style={{ color: "#0099ff" }}>
                                    <p>
                                        Likes:{" "}
                                        {item.posRatings_cnt ? item.posRatings_cnt : 0}
                                    </p>
                                    <LikeOutlined />
                                </Space>
                            ) : (
                                    <Space align="start">
                                        <p>
                                            Likes:{" "}
                                            {item.posRatings_cnt ? item.posRatings_cnt : 0}
                                        </p>
                                        <LikeOutlined />
                                    </Space>
                                )}
                        </>
                    </Row>
                    <List_Tag tags={item.tags} />
                </List.Item>
            )}
        />
    );
};

export default List_User;

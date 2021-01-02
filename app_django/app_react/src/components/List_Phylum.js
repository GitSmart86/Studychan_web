import React from "react";
import { Link } from "react-router-dom";

import { List, Avatar, Progress, Row, Divider, Space } from "antd";
import {
    BellOutlined,
    LikeOutlined,
    DislikeOutlined,
} from "@ant-design/icons";
import List_Tag from "./List_Tag";
import { LOCALHOST } from "../redux/misc/constants";

const List_Phylum = (props) => {
    return (
        <List
            itemLayout="vertical"
            // size="large"
            pagination={{
                onChange: (page) => {
                    // console.log(page);
                },
                pageSize: 5,
            }}
            dataSource={props.data}
            renderItem={(item) => (
                <List.Item key={item.title} actions={[]} extra={null}>
                    <List.Item.Meta
                        avatar={
                            <Link to={`/database/${props.phylum}/${item.id}`}>
                                <Avatar size={64} src={LOCALHOST + item.icon} />
                            </Link>
                        }
                        title={
                            <div>
                                <Link to={`/database/${props.phylum}/${item.id}`} >
                                    {item.name}
                                </Link>

                                <div style={{ width: 10 }}></div>
                                <Divider type="vertical" />
                                <div style={{ width: 10 }}></div>

                                <Link to={`/account/${item.owner}`} style={{ color: "black", fontSize: "0.9em" }}>
                                    By: {item.owner_name}
                                </Link>
                            </div>
                        }
                    />
                    <Row>
                        {item.sub_cnt >= 0 && (

                            item.u_subbed == 1 ? (
                                <Space align="start" style={{ color: "red" }}>
                                    <p>{`Subscribers: ${item.sub_cnt}`}</p>
                                    <BellOutlined />
                                </Space>
                            ) : (
                                    <Space align="start">
                                        <p>{`Subscribers: ${item.sub_cnt}`}</p>
                                        <BellOutlined />
                                    </Space>
                                )
                        )}
                        <Divider type="vertical"></Divider>

                        {item.u_liked == 0 ? (
                            <Space align="start">
                                <p>
                                    Rates:{" "}
                                    {item.posRating_cnt + item.negRating_cnt >= 0
                                        ? item.posRating_cnt + item.negRating_cnt
                                        : 0}
                                </p>
                                <LikeOutlined />
                                <DislikeOutlined />
                            </Space>
                        ) : (
                                item.u_liked == 1 ? (
                                    <Space align="start" style={{ color: "#0099ff" }}>
                                        <p>
                                            Rates:{" "}
                                            {item.posRating_cnt + item.negRating_cnt >= 0
                                                ? item.posRating_cnt + item.negRating_cnt
                                                : 0}
                                        </p>
                                        <LikeOutlined />
                                        <DislikeOutlined />
                                    </Space>
                                ) : (
                                        <Space align="start" style={{ color: "red" }}>
                                            <p>
                                                Rates:{" "}
                                                {item.posRating_cnt + item.negRating_cnt >= 0
                                                    ? item.posRating_cnt + item.negRating_cnt
                                                    : 0}
                                            </p>
                                            <LikeOutlined />
                                            <DislikeOutlined />
                                        </Space>

                                    ))}

                        <Divider type="vertical"></Divider>
                        <div style={{ width: "150px" }}>
                            <Progress
                                percent={
                                    (item.posRating_cnt /
                                        (item.posRating_cnt +
                                            item.negRating_cnt)) *
                                    100
                                }
                                size="small"
                                showInfo={false}
                                strokeColor={"lightgreen"}
                                trailColor={"lightgrey"}
                            />
                        </div>

                    </Row>
                    <List_Tag tags={item.tags} />
                </List.Item>
            )}
        />
    );
};

export default List_Phylum;

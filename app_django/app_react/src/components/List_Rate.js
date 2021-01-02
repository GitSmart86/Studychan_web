import React from "react";
import { Link } from "react-router-dom";

import { List, Avatar, Card, } from "antd";
import {
    RightCircleTwoTone,
    LikeOutlined,
    DislikeOutlined,
} from "@ant-design/icons";
import { LOCALHOST } from "../redux/misc/constants";

import axios from "../redux/authentication/axios";
import { useEffect, useState } from "react";

const IconText = ({ text }) => (
    <span>
        <RightCircleTwoTone />
        {text}
    </span>
);

const List_Rate = (props) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        axios
            .get(
                `http://127.0.0.1:8000/api/rate_database_search/?raterid=${props.accountId}&phylum=${props.phylum}`
            )
            .then((response) => {
                console.log("RESPONSE: ", response.data);
                setData(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return data ? (
        <List
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
                <List.Item
                    key={item.content.id}
                    actions={
                        [
                            // <IconText type="star-o" text="156" />,
                            // <IconText type="like-o" text="156" />,
                            // <IconText type="message" text="2" />,
                        ]
                    }
                    extra={<></>}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={LOCALHOST + item.content.icon} />}
                        title={
                            <Link
                                to={`/database/${props.phylum}/${item.content.id}`}
                            >
                                {item.content.name
                                    ? item.content.name
                                    : item.content.username}
                            </Link>
                        }
                    />

                    <Card
                        title={item.rate.timestamp.toString().split("T")[0]}
                        size="small"
                    // style={{ width: 158 }}
                    >
                        {item.rate.posRating ? (
                            <LikeOutlined />
                        ) : (
                                <DislikeOutlined />
                            )}
                    </Card>
                </List.Item>
            )}
        />
    ) : null;
};

export default List_Rate;

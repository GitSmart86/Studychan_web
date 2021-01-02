import React from "react";
import { Link } from "react-router-dom";

import { List, Avatar, Card, Rate } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { LOCALHOST } from "../redux/misc/constants";

import axios from "../redux/authentication/axios";
import { useEffect, useState } from "react";

// const IconText = ({ text }) => (
//     <span>
//         <RightCircleTwoTone />
//         {text}
//     </span>
// );

const List_Sample = (props) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        console.log("ACCOUNTID:", props.accountId);
        axios
            .get(
                `http://127.0.0.1:8000/api/rev_database_search/?reviewerid=${props.accountId}&phylum=${props.phylum}`
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
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src={
                                item.content.icon
                                    ? LOCALHOST + item.content.icon
                                    : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            }
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.content.icon} />}
                        title={
                            <Link
                                to={`/database/${props.phylum}/${item.content.id}`}
                            >
                                {item.content.name}
                            </Link>
                        }
                    />

                    <Card
                        title={
                            item.review.timestamp_updated
                                .toString()
                                .split("T")[0]
                        }
                        size="small"
                        // style={{ width: 158 }}
                        extra={
                            <Link to="#">
                                <EditOutlined />
                            </Link>
                        }
                    >
                        <Rate
                            disabled
                            defaultValue={item.review.stars}
                        // style={{ fontSize: 12 }}
                        />
                        <br />
                        <br />
                        <p>{item.review.description}</p>
                    </Card>
                </List.Item>
            )}
        />
    ) : null;
};

export default List_Sample;

import React from "react";
import { Link } from "react-router-dom";

import { List, Avatar, Card, Rate, Divider } from "antd";
// import { RightCircleTwoTone, } from "@ant-design/icons";
import { LOCALHOST } from "../redux/misc/constants";

import axios from "../redux/authentication/axios";
import { useEffect, useState } from "react";


const List_Rev = (props) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const idString = props.accountId
            ? `reviewerid=${props.accountId}&`
            : `phylumid=${props.phylumId}&`;

        axios
            .get(
                `http://127.0.0.1:8000/api/rev_database_search/?` +
                idString +
                `phylum=${props.phylum}`
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
                <List.Item key={item.content.id} actions={[]} extra={<></>}>
                    <List.Item.Meta
                        avatar={<Avatar src={LOCALHOST + item.content.icon} />}
                        title={
                            <Link
                                to={`/account/${item.content.id}`}
                            >
                                {item.content.username}
                            </Link>
                        }
                    />

                    <Card
                        title={
                            <div>
                                {
                                    item.review.timestamp_updated
                                        .toString()
                                        .split("T")[0]
                                }
                                {/* <Divider direction="vertical"></Divider>
                                <Link
                                    to={`/account/${item.content.id}`}
                                >
                                    {item.content.username}
                                </Link> */}
                            </div>
                        }
                        size="small"
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

export default List_Rev;

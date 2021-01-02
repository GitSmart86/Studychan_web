import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { List, Avatar, } from "antd";
import { LOCALHOST } from "../redux/misc/constants";
// import { RightCircleTwoTone, } from "@ant-design/icons";

// import * as actions from "../redux/authentication/actions/auth";
import axios from "../redux/authentication/axios";
import { useEffect, useState } from "react";


const List_Sub = (props) => {
    let dispatch = useDispatch();
    const [data, setData] = useState(null);
    useEffect(() => {
        axios
            .get(
                `http://127.0.0.1:8000/api/sub_database_search/?subberid=${props.accountId}&phylum=${props.phylum}`
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
                    key={item.id}
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
                        avatar={<Avatar src={LOCALHOST + item.icon} />}
                        title={
                            item.name ? (
                                <Link
                                    to={`/database/${props.phylum}/${item.id}`}
                                    onClick={() => {
                                        // dispatch(actions.refreshLayout());
                                        // console.log("fired!");
                                    }}
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                    <Link
                                        to={`/redirect//account/${item.id}`}
                                        onClick={() => {
                                            // dispatch(actions.refreshLayout());
                                            // console.log("fired!");
                                            // props.history.push("/temp");
                                            // props.history.goBack();
                                        }}
                                    >
                                        {item.username}
                                    </Link>
                                )
                        }
                    />
                </List.Item>
            )}
        />
    ) : null;
};

export default List_Sub;

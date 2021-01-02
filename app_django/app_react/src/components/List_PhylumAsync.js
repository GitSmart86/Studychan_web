import React from "react";
import { Link } from "react-router-dom";
import { useSelector, } from "react-redux";

import { List, Avatar } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { LOCALHOST } from "../redux/misc/constants";

import axios from "../redux/authentication/axios";
import { useEffect, useState } from "react";


const List_PhylumAsync = (props) => {
    const userId = useSelector((state) => state.userId);

    const [data, setData] = useState(null);
    useEffect(() => {
        console.log("ACCOUNTID:", props.accountId);
        axios
            .get(
                `http://127.0.0.1:8000/api/user_database_search/?ownerId=${props.accountId}&phylum=${props.phylum}&isPublished=${props.isPublished}`
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
                    key={item.title}
                    actions={
                        [
                            // <IconText type="star-o" text="156" />,
                        ]
                    }
                    extra={<></>}
                >
                    <List.Item.Meta
                        avatar={
                            <Link
                                to={
                                    props.isPublished
                                        ? `/database/${props.phylum}/${item.id}`
                                        : `/database/${props.phylum}/${item.id}/edit`
                                }
                            >
                                <Avatar src={LOCALHOST + item.icon} />
                            </Link>
                        }
                        title={
                            <Link
                                to={
                                    props.isPublished
                                        ? `/database/${props.phylum}/${item.id}`
                                        : `/database/${props.phylum}/${item.id}/edit`
                                }
                            >
                                {item.name}
                            </Link>
                        }
                    />
                    {userId == props.accountId && props.isPublished && (
                        <Link to={`/database/${props.phylum}/${item.id}/edit`}>
                            <EditOutlined style={{ fontSize: "large" }} /> Edit
                        </Link>
                    )}
                </List.Item>
            )}
        />
    ) : null;
};

export default List_PhylumAsync;



// <div>
// <Link
//     to={
//         props.isPublished
//             ? `/database/${props.phylum}/${item.id}`
//             : `/database/${props.phylum}/${item.id}/edit`
//     }
// >
//     {item.name}
// </Link>
// {userId == props.accountId && props.isPublished && (
//     <>
//         <Divider direction="vertical"></Divider>

//         <Link to={`/database/${props.phylum}/${item.id}/edit`}>
//             <EditOutlined style={{ fontSize: "large" }} /> Edit
//         </Link>
//     </>
// )}
// </div>
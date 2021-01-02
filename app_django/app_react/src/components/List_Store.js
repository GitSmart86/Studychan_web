import React from "react";
import { Link } from "react-router-dom";

import { List, Avatar } from "antd";
import { LOCALHOST } from "../redux/misc/constants";
// import { RightCircleTwoTone } from "@ant-design/icons";

// const IconText = ({ text }) => (
//     <span>
//         <RightCircleTwoTone />
//         {text}
//     </span>
// );

const List_Store = (props) => {
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
                <List.Item
                    key={item.title}
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
                            <Link to={`/store/${props.phylum}/${item.id}`}>
                                {item.name}
                            </Link>
                        }
                        description={item.description}
                    />

                    {item.id}
                </List.Item>
            )}
        />
    );
};

export default List_Store;

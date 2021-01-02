import React from "react";

import { List, Avatar } from "antd";
// import { RightCircleTwoTone } from "@ant-design/icons";
import Item_Tag from "./Item_Tag";

const List_Tag = (props) => {
    return props.tags && props.tags.length > 0 ? (
        <List
            grid={{
                gutter: 60,
                xs: 2,
                sm: 3,
                md: 3,
                lg: 3,
                xl: 3,
                xxl: 3,
            }}
            dataSource={props.tags}
            renderItem={(item) => (
                <List.Item>
                    <Item_Tag tag={item} />
                </List.Item>
            )}
        />
    ) : (
            <p> No Tags </p>
        );
};

export default List_Tag;

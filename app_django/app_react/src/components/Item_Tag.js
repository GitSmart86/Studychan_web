import React from "react";
import { Avatar, } from "antd";
import { LOCALHOST } from "../redux/misc/constants";

const Item_Tag = (props) => {
    // console.log("PROPS: ", props.tag.icon);

    return (
        <div
            align="center"
            style={{
                padding: "5px 15px 5px 10px",
                background: "rgba(150, 150, 150, 0.2)",
                border: "1px solid #40a9ff",
                minWidth: 90,
                maxWidth: 180,
            }}
        >
            <Avatar size={40} src={LOCALHOST + props.tag.icon} />
            <br />
            <span>{props.tag.name}</span>
        </div>
    );
};

export default Item_Tag;

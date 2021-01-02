// import { connect, useSelector } from "react-redux";
// import React, { useEffect, useState } from "react";

// import { Tabs, Avatar, Space, Button, Card } from "antd";
// import { Link, NavLink } from "react-router-dom";
// import {
//     UserAddOutlined,
//     UserOutlined,
//     BellOutlined,
//     LikeOutlined,
//     EditOutlined,
//     LoadingOutlined,
// } from "@ant-design/icons";
// import List_Tag from "../../../components/List_Tag";
// import { LOCALHOST } from "../../../redux/misc/constants";
// import axios from "../../../redux/authentication/axios";

// const Body_Acct_Pub = (props) => {
//     const userId = useSelector((state) => state.userId);

//     const [data, setData] = useState(null);
//     useEffect(() => {
//         axios
//             // .get(`api/userdj/${accountId}`)
//             .get(`api/obtainuserdata/?id=${props.accountId}`)
//             .then((response) => {
//                 console.log("RESPONSE:", response.data);
//                 setData(response.data);
//             });
//     }, []);

//     function viewerAction(type) {
//         let request = "";

//         switch (type) {
//             case "sub":
//                 request = `api/user/${data.id}/subscribe`;
//                 break;
//             case "like":
//                 request = `api/user/${data.id}/rate/pos`;
//                 break;
//             default:
//                 break;
//         }

//         axios
//             .post(request)
//             .then((response) => {
//                 console.log("RESPONSE: ", response.data);
//             })
//             .catch((error) => console.error(error));
//     }

//     return !data ? (
//         <LoadingOutlined style={{ fontSize: "100px", padding: "10%" }} />
//     ) : (
//         <div>
//             <Space direction="vertical">
//                 <Space align="baseline">
//                     <Avatar size={64} src={LOCALHOST + data.userData.icon} />
//                     <span>{data.userData.username}</span>

//                     {userId == data.userData.id && (
//                         <Button>
//                             <Link
//                                 to={`/account/${data.userData.id}/public/edit`}
//                             >
//                                 <EditOutlined /> Edit
//                             </Link>
//                         </Button>
//                     )}
//                 </Space>

//                 <Space align="center">
//                     <span>Subscribers: {data.userData.subscribers_cnt} </span>
//                     <Button onClick={() => viewerAction("sub")}>
//                         <BellOutlined />
//                     </Button>

//                     <span>Likes: {data.userData.posRatings_cnt} </span>
//                     <Button onClick={() => viewerAction("like")}>
//                         <LikeOutlined />
//                     </Button>

//                     <span>
//                         Member since{" "}
//                         {Intl.DateTimeFormat("en-US", {
//                             year: "numeric",
//                             // month: "short",
//                             // day: "2-digit",
//                         }).format(data.userData.date_Joined)}
//                     </span>
//                 </Space>

//                 <Space>
//                     <List_Tag tags={data.userTags && data.userTags} />
//                 </Space>

//                 <Space>
//                     <p>{data.userData.description}</p>
//                 </Space>
//             </Space>
//         </div>
//     );
// };

// export default Body_Acct_Pub;

// .
// .
// .
// .prototype..
// .
// .
// .
// ..
// .
// .
// .prototype.Body_Acct_UnPub.prototype.
// .
// .
// .
// .prototype.constructor.
// .
// .
// .
// .
// .
// .
// .prototype.constructor.
// .
// .
// .
// .
// .
// .
// .
// .
// .

import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import useWindowDimensions from "../../../redux/misc/windowDimensions";
import { RESPONSIVE_WIDTH } from "../../../redux/misc/constants";

import { Button } from "antd";
import { LoadingOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "../../../redux/authentication/axios";


const Body_Acct_UnPub = (props) => {
    const userId = useSelector((state) => state.userId);
    const { height, width } = useWindowDimensions();

    const [data, setData] = useState(null);
    useEffect(() => {
        axios
            // .get(`api/userdj/${accountId}`)
            .get(`api/userdj/${props.accountId}/`)
            .then((response) => {
                console.log("RESPONSE:", response.data);
                setData(response.data);
            });
    }, []);

    let res_tab_pubAcct = null;
    let res_tab_privAcct = null;
    let res_tab_sub = null;
    let res_tab_like = null;
    let res_tab_pub = null;
    let res_tab_unPub = null;
    let res_tab_rev = null;

    if (width > RESPONSIVE_WIDTH) {
        res_tab_pubAcct = "Public Account";
        res_tab_privAcct = "Account Details";
        res_tab_sub = "Subscriptions";
        res_tab_like = "Likes";
        res_tab_rev = "Reviews";
        res_tab_pub = "Your Published";
        res_tab_unPub = "Your Unpublished";
    }

    console.log(data && data);

    return !data ? (
        <LoadingOutlined style={{ fontSize: "100px", padding: "10%" }} />
    ) : (
            <>
                {userId == data.id && (
                    <Button>
                        <Link to={`/account/${data.id}/private/edit`}>
                            <EditOutlined /> Edit
                    </Link>
                    </Button>
                )}

                <p>Need to add: </p>
                <ul>
                    <li>your addons</li>
                    <li>your themes + theme selector</li>
                    <li>your deed + expiration</li>
                    <li>your deed use</li>
                    <li>edit OAuth options</li>
                    <li>toggle helpmode</li>
                </ul>
            </>
        );
};

export default Body_Acct_UnPub;

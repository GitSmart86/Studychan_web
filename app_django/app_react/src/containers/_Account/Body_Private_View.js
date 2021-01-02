// import { connect, useSelector, useDispatch } from "react-redux";
import React, { } from "react";

// import axios from "../../redux/authentication/axios";
import useWindowDimensions from "../../redux/misc/windowDimensions";
import { RESPONSIVE_WIDTH } from "../../redux/misc/constants";

import { Tabs } from "antd";
import { UserAddOutlined, BellOutlined, LikeOutlined, MessageOutlined, UserSwitchOutlined, UserOutlined, FileOutlined, FileAddOutlined } from "@ant-design/icons";

import Body_Acct_Pub from "./Body_Private/Body_Acct_Pub";
import Body_Acct_UnPub from "./Body_Private/Body_Acct_UnPub";
import Body_Cont_Pub from "./Body_Private/Body_Cont_Pub";
import Body_Cont_UnPub from "./Body_Private/Body_Cont_UnPub";
import Body_Rate from "./Body_Private/Body_Rate";
import Body_Rev from "./Body_Private/Body_Rev";
import Body_Sub from "./Body_Private/Body_Sub";

const { TabPane } = Tabs;

const Body_Private_View = (props) => {
    const { height, width } = useWindowDimensions();

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

    // console.log("2nd layer Props: ", props);

    return (
        <div>
            <Tabs
                tabPosition="left"
                size="default"
                type="card"
                tabBarGutter={5}
            >
                <TabPane
                    tab={
                        <span>
                            <UserSwitchOutlined />
                            {res_tab_pubAcct}
                        </span>
                    }
                    key="1"
                >
                    <Body_Acct_Pub accountId={props.accountId} />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <UserOutlined />
                            {res_tab_privAcct}
                        </span>
                    }
                    key="2"
                >
                    <Body_Acct_UnPub accountId={props.accountId} />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <BellOutlined />
                            {res_tab_sub}
                        </span>
                    }
                    key="3"
                >
                    <Body_Sub accountId={props.accountId} />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <LikeOutlined />
                            {res_tab_like}
                        </span>
                    }
                    key="4"
                >
                    <Body_Rate accountId={props.accountId} />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <MessageOutlined />
                            {res_tab_rev}
                        </span>
                    }
                    key="5"
                >
                    <Body_Rev accountId={props.accountId} />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <FileOutlined />
                            {res_tab_pub}
                        </span>
                    }
                    key="6"
                >
                    <Body_Cont_Pub accountId={props.accountId} />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <FileAddOutlined />
                            {res_tab_unPub}
                        </span>
                    }
                    key="7"
                >
                    <Body_Cont_UnPub accountId={props.accountId} />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Body_Private_View;

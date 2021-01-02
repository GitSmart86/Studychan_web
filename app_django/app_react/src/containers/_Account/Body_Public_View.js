// import { connect, useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import axios from "../../redux/authentication/axios";
import Body_Acct_Pub from "./Body_Private/Body_Acct_Pub";
import Body_Cont_Pub from "./Body_Private/Body_Cont_Pub";
import useWindowDimensions from "../../redux/misc/windowDimensions";
import { RESPONSIVE_WIDTH } from "../../redux/misc/constants";

import { Tabs } from "antd";
import { UserAddOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const Body_Public_View = (props) => {
    const { height, width } = useWindowDimensions();

    // const [data, setData] = useState(null);
    // useEffect(() => {
    //     axios
    //         // .get(`api/userdj/${accountId}`)
    //         .get(`api/obtainuserdata/?id=${props.accountId}`)
    //         .then((response) => {
    //             console.log("RESPONSE:", response.data);
    //             setData(response.data);
    //         });
    // }, []);

    let res_tab_pubAcct_main = null;
    let res_tab_pubAcct_phylums = null;

    if (width > RESPONSIVE_WIDTH) {
        res_tab_pubAcct_main = "Profile";
        res_tab_pubAcct_phylums = "Content";
    }

    return (
        <Tabs tabPosition="top" size="default" type="card" tabBarGutter={5}>
            <TabPane
                tab={
                    <span>
                        <UserOutlined />
                        {res_tab_pubAcct_main}
                    </span>
                }
                key="1"
            >
                {/* <Body_Acct_Pub accountId={props.accountId} userData={data} /> */}
                <Body_Acct_Pub accountId={props.accountId} />
            </TabPane>

            <TabPane
                tab={
                    <span>
                        <FileOutlined />
                        {res_tab_pubAcct_phylums}
                    </span>
                }
                key="2"
            >
                <Body_Cont_Pub accountId={props.accountId} />
            </TabPane>
        </Tabs>
        // <Body_Acct_Pub accountId={props.accountId} userData={props.userData} />
    );
};

export default Body_Public_View;

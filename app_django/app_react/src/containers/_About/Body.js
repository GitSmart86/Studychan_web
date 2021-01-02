import React from "react";
import useWindowDimensions from "../../redux/misc/windowDimensions";
import { RESPONSIVE_WIDTH } from "../../redux/misc/constants";

import cover_icon from '../../media/cover_icon.png'
import { Tabs, Avatar, Space } from "antd";
import {
    LaptopOutlined,
    WifiOutlined,
    MessageOutlined,
    MobileOutlined,
    Html5TwoTone,
} from "@ant-design/icons";
import Body_Website from "./Body_Website";
import Body_Studychan from "./Body_Studychan";
import Body_Mobile from "./Body_Mobile";
import Body_Desktop from "./Body_Desktop";
import Body_HelpFeedback from "./Body_HelpFeedback";

const { TabPane } = Tabs;

const Body_About = (props) => {
    const { height, width } = useWindowDimensions();

    let res_tab_studychan = null;
    let res_tab_website = null;
    let res_tab_mobile = null;
    let res_tab_desktop = null;
    let res_tab_help = null;

    if (width > RESPONSIVE_WIDTH) {
        res_tab_studychan = "Studychan";
        res_tab_website = "Website";
        res_tab_mobile = "Mobile App";
        res_tab_desktop = "Desktop App";
        res_tab_help = "Help & Feedback";
    }

    return (
        <>
            <Tabs
                tabPosition="left"
                size="default"
                type="card"
                tabBarGutter={5}
            >
                <TabPane
                    tab={
                        <Space>
                            {/* <Html5TwoTone /> */}
                            <Avatar src={cover_icon} />
                            {res_tab_studychan}
                        </Space>
                    }
                    key="1"
                >
                    <div style={{ padding: "20px 20px 20px 20px" }}>
                        <Body_Studychan />
                    </div>
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <WifiOutlined />
                            {res_tab_website}
                        </Space>
                    }
                    key="2"
                >
                    <div style={{ padding: "20px 20px 20px 20px" }}>
                        <Body_Website />
                    </div>
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <MobileOutlined />
                            {res_tab_mobile}
                        </Space>
                    }
                    key="3"
                >
                    <div style={{ padding: "20px 20px 20px 20px" }}>
                        <Body_Mobile />
                    </div>
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <LaptopOutlined />
                            {res_tab_desktop}
                        </Space>
                    }
                    key="4"
                >
                    <div style={{ padding: "20px 20px 20px 20px" }}>
                        <Body_Desktop />
                    </div>
                </TabPane>

                <TabPane
                    tab={
                        <Space>
                            <MessageOutlined />
                            {res_tab_help}
                        </Space>
                    }
                    key="5"
                >
                    <div style={{ padding: "20px 20px 20px 20px" }}>
                        <Body_HelpFeedback />
                    </div>
                </TabPane>
            </Tabs>
        </>
    );
};

export default Body_About;

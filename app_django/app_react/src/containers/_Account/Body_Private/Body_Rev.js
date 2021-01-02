// import { connect } from "react-redux";
import React, { } from "react";

import useWindowDimensions from "../../../redux/misc/windowDimensions";
import { RESPONSIVE_WIDTH } from "../../../redux/misc/constants";
import List_Rev from "../../../components/List_Rev";

import { Tabs } from "antd";
import { UserAddOutlined, BlockOutlined, BookOutlined, BorderOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const Body_Rev = (props) => {
    const { height, width } = useWindowDimensions();

    let res_tab_deck = null;
    let res_tab_group = null;
    let res_tab_note = null;

    if (width > RESPONSIVE_WIDTH) {
        res_tab_deck = "Decks";
        res_tab_group = "Groupdecks";
        res_tab_note = "Notes";
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
                        <span>
                            <BorderOutlined />
                            {res_tab_deck}
                        </span>
                    }
                    key="1"
                >
                    <List_Rev accountId={props.accountId} phylum={"deck"} />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <BlockOutlined />
                            {res_tab_group}
                        </span>
                    }
                    key="2"
                >
                    <List_Rev
                        accountId={props.accountId}
                        phylum={"groupdeck"}
                    />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <BookOutlined />
                            {res_tab_note}
                        </span>
                    }
                    key="3"
                >
                    <List_Rev accountId={props.accountId} phylum={"note"} />
                </TabPane>
            </Tabs>
        </>
    );
};

export default Body_Rev;

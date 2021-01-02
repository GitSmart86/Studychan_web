import { connect } from "react-redux";
import React, { } from "react";

import useWindowDimensions from "../../../redux/misc/windowDimensions";
import { RESPONSIVE_WIDTH } from "../../../redux/misc/constants";
import List_Rate from "../../../components/List_Rate";

import { Tabs } from "antd";
import { UserAddOutlined, HeartOutlined, BorderOutlined, BlockOutlined, BookOutlined, FormatPainterOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const Body_Rate = (props) => {
    const { height, width } = useWindowDimensions();

    let res_tab_user = null;
    let res_tab_ccpick = null;
    let res_tab_deck = null;
    let res_tab_group = null;
    let res_tab_note = null;
    let res_tab_format = null;

    if (width > RESPONSIVE_WIDTH) {
        res_tab_user = "Users";
        res_tab_ccpick = "ccPicks";
        res_tab_deck = "Decks";
        res_tab_group = "Groupdecks";
        res_tab_note = "Notes";
        res_tab_format = "Formats";
    }

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
                            <UserAddOutlined />
                            {res_tab_user}
                        </span>
                    }
                    key="1"
                >
                    <List_Rate accountId={props.accountId} phylum={"user"} />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <HeartOutlined />
                            {res_tab_ccpick}
                        </span>
                    }
                    key="2"
                >
                    <List_Rate accountId={props.accountId} phylum={"ccpick"} />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <BorderOutlined />
                            {res_tab_deck}
                        </span>
                    }
                    key="3"
                >
                    <List_Rate accountId={props.accountId} phylum={"deck"} />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <BlockOutlined />
                            {res_tab_group}
                        </span>
                    }
                    key="4"
                >
                    <List_Rate
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
                    key="5"
                >
                    <List_Rate accountId={props.accountId} phylum={"note"} />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <FormatPainterOutlined />
                            {res_tab_format}
                        </span>
                    }
                    key="6"
                >
                    <List_Rate accountId={props.accountId} phylum={"format"} />
                </TabPane>
            </Tabs>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};

export default connect(mapStateToProps)(Body_Rate);

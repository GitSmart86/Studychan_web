import { connect } from "react-redux";
import React, { } from "react";

import useWindowDimensions from "../../../redux/misc/windowDimensions";
import { RESPONSIVE_WIDTH } from "../../../redux/misc/constants";
import List_PhylumAsync from "../../../components/List_PhylumAsync";

import { Tabs } from "antd";
import { UserAddOutlined, HeartOutlined, BorderOutlined, BlockOutlined, BookOutlined, FormatPainterOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const Body_Cont_Pub = (props) => {
    console.log("ACCOUNTID: 3rd", props.accountId);
    const { height, width } = useWindowDimensions();

    let res_tab_ccpick = null;
    let res_tab_deck = null;
    let res_tab_group = null;
    let res_tab_note = null;
    let res_tab_format = null;

    if (width > RESPONSIVE_WIDTH) {
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
                            <HeartOutlined />
                            {res_tab_ccpick}
                        </span>
                    }
                    key="2"
                >
                    <List_PhylumAsync
                        accountId={props.accountId}
                        phylum={"ccpick"}
                        isPublished={true}
                    />
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
                    <List_PhylumAsync
                        accountId={props.accountId}
                        phylum={"deck"}
                        isPublished={true}
                    />
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
                    <List_PhylumAsync
                        accountId={props.accountId}
                        phylum={"groupdeck"}
                        isPublished={true}
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
                    <List_PhylumAsync
                        accountId={props.accountId}
                        phylum={"note"}
                        isPublished={true}
                    />
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
                    <List_PhylumAsync
                        accountId={props.accountId}
                        phylum={"format"}
                        isPublished={true}
                    />
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

export default connect(mapStateToProps)(Body_Cont_Pub);

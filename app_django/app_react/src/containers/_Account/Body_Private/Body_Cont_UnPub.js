import { connect } from "react-redux";
import React, { } from "react";

import useWindowDimensions from "../../../redux/misc/windowDimensions";
import { RESPONSIVE_WIDTH } from "../../../redux/misc/constants";
import List_PhylumAsync from "../../../components/List_PhylumAsync";

import { Tabs, Button } from "antd";
import { UserAddOutlined, EditOutlined, BlockOutlined, BorderOutlined, BookOutlined, HeartOutlined, FormatPainterOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

const Body_Cont_UnPub = (props) => {
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
                    <div style={{ padding: "10px", fontSize: "16px" }}>
                        <Button type="primary">
                            <NavLink to={`/database/ccpick/new/create`}>
                                <EditOutlined /> Create New ccPick
                            </NavLink>
                        </Button>
                    </div>

                    <List_PhylumAsync
                        accountId={props.accountId}
                        phylum={"ccpick"}
                        isPublished={false}
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
                    <div style={{ padding: "10px", fontSize: "16px" }}>
                        <Button type="primary">
                            <NavLink to={`/database/deck/new/create`}>
                                <EditOutlined /> Create New Deck
                            </NavLink>
                        </Button>
                    </div>

                    <List_PhylumAsync
                        accountId={props.accountId}
                        phylum={"deck"}
                        isPublished={false}
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
                    <div style={{ padding: "10px", fontSize: "16px" }}>
                        <Button type="primary">
                            <NavLink to={`/database/groupdeck/new/create`}>
                                <EditOutlined /> Create New Groupdeck
                            </NavLink>
                        </Button>
                    </div>

                    <List_PhylumAsync
                        accountId={props.accountId}
                        phylum={"groupdeck"}
                        isPublished={false}
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
                    <div style={{ padding: "10px", fontSize: "16px" }}>
                        <Button type="primary">
                            <NavLink to={`/database/note/new/create`}>
                                <EditOutlined /> Create New Note
                            </NavLink>
                        </Button>
                    </div>

                    <List_PhylumAsync
                        accountId={props.accountId}
                        phylum={"note"}
                        isPublished={false}
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
                    <div style={{ padding: "10px", fontSize: "16px" }}>
                        <Button type="primary">
                            <NavLink to={`/database/format/new/create`}>
                                <EditOutlined /> Create New Format
                            </NavLink>
                        </Button>
                    </div>

                    <List_PhylumAsync
                        accountId={props.accountId}
                        phylum={"format"}
                        isPublished={false}
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

export default connect(mapStateToProps)(Body_Cont_UnPub);

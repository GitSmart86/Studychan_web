import React, { } from "react";

import useWindowDimensions from "../../redux/misc/windowDimensions";
import { RESPONSIVE_WIDTH } from "../../redux/misc/constants";

import { MehTwoTone } from "@ant-design/icons";
import { Space } from "antd";

const Body_Website = (props) => {
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
            <p>Information Page About - Website</p>

            <Space align="center" direction="horizontal" size="large">
                <MehTwoTone style={{ fontSize: '48px' }} />
                <h3>Work in progress...</h3>
            </Space>

            <br /><br />
            <p>* StudyChan.com is the community sharing and communication hub:</p>

            <h4>TODO:</h4>

            <ul>
                <li> redesign website icon/avatar </li>
                <li> set website color theme </li>
                <li> make modern welcome-screen art and explanitory text for About, Database, Account, Store </li>
                <li> signup void-token bug (forces user to signout -> sign again on acct creation) </li>
                <li> add features:
                    <ul>
                        <li> Deck cards </li>
                        <li> Groupdeck cards </li>
                        <li> Note pages </li>
                        <li> Format styles (to stylize cards) </li>
                        <li> acct details & respective settings menu </li>
                        <li> themes and DB deeds & respective store-page fields </li>
                    </ul>
                </li>
                <li> subscription event logic to sync with other devices </li>
                <li> payment handler 3rd party API </li>
            </ul>

            {/* <br /><br />
            <p>... Users can search for, review, subscribe to, and post their own study content to the community database.</p>
            <br /><br />
            <p>... Users can also <b>browse the community's ccPicks page</b> (content creator picks) to find other helpful 3rd. party websites and youtube channels.</p>
            <br /><br />
            <p>... Users can <b>optionally donate to StudyChan content creators</b> to support especially useful or high-quality.</p>
            <br /><br /> */}
        </>
    );
};

export default Body_Website;

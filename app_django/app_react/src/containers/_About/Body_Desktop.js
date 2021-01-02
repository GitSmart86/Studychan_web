import React from "react";

import useWindowDimensions from "../../redux/misc/windowDimensions";
import { RESPONSIVE_WIDTH } from "../../redux/misc/constants";

import { MehTwoTone } from "@ant-design/icons";
import { Space } from "antd";

const Body_Desktop = (props) => {
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
            <p>Information Page About - Desktop</p>

            <Space align="center" direction="horizontal" size="large">
                <MehTwoTone style={{ fontSize: '48px' }} />
                <h3>Planning in progress...</h3>
            </Space>

            <br /><br />
            <p>* StudyChan.exe is the learning and personal acct DB management hub:</p>

            <h4>TODO:</h4>

            <ul>
                <li> everything... work has not started yet </li>
            </ul>

            {/* <br /><br />
            <p>... Users can create, download, manage, and review subscribed study material.</p>
            <br /><br />
            <p>... Users can <b>convert and import</b> other popular study cards for StudyChan.</p>
            <br /><br />
            <p>... With users running StudyChan.exe in the background, users can copy and translate foreign text
                <br /> to <b>automatically create study cards</b> from websites, pdf books, or subtitled text.
                <br /> This service functions similarly to Yomichan, but unlike a webrowser extension,
                <br /> this version is streamlined and works offline and on non-browser content.</p>
            <br /><br /> */}
        </>
    );
};

export default Body_Desktop;

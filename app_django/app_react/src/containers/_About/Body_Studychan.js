import React, { } from "react";

import useWindowDimensions from "../../redux/misc/windowDimensions";
import { RESPONSIVE_WIDTH } from "../../redux/misc/constants";

import { MehTwoTone } from "@ant-design/icons";
import { Space } from "antd";
import cover_landscape_zoom from "../../media/cover_landscape_zoom.png"

const Body_Studychan = (props) => {
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
            <p>Information Page About - Studychan</p>

            <Space align="center" direction="horizontal" size="large">
                <MehTwoTone style={{ fontSize: '48px' }} />
                <h2>Welcome to the work in progress!</h2>
            </Space>

            <img src={cover_landscape_zoom} style={{ padding: "20px", width: "600px" }} />

            <br />

            <h2>* StudyChan will eventually do two things really well:</h2>

            <br />

            <h2>1:</h2> <p><b style={{ fontSize: "1.2em" }}> Provide a reference database to quality educators and thorough educational material for any given topic.</b>

                <br /> Thesedays, it is easy to Google for raw information on short topics. However, it can be tough
                <br /> to find and organize quality content for indepth university-level topics or vast and advanced hands-on topics.
                <br />
                <br /> <b style={{ fontSize: "1.2em" }}>StudyChan's ccPick (Content Creators Pick)</b> database hopes to easily answer questions like:
                <br /><br />
                <ul>
                    <li>"Which source has the best explanation of Japanese grammer?"<br /><br /></li>
                    <li>"This guy has nice Calculus 3 videos for solving, but who covers the proofs?"<br /><br /></li>
                    <li>"Where should I look to find good foreign language subtitles?"</li>
                </ul>
            </p>

            <br /><br />

            <p> <h2>2a:</h2> Be a compelling <b style={{ fontSize: "1.2em" }}>refreshed alternative to Anki Flashcards</b> by including the core features
                <br /> of SRS (spaced repetition learning system) and TTS (text-to-speach), but also by simplifying and streamlining many of Anki's technical hassles.
            </p>

            <br /><br />

            <p> <h2>2b:</h2> StudyChan also wants to <b style={{ fontSize: "1.2em" }}>add new features</b> like:

                <br /><br /> - <b style={{ fontSize: "1.2em" }}>Groupdecks</b> is a study mode that allows users to simultaneously study grouped cards together, while maintaining individual card learning SRS values.

                <br /><br /> - <b style={{ fontSize: "1.2em" }}>Notes</b> are brief PDF's that can be created to share summaries, soundclips, and visual aids for educational topics.

                <br /><br /> - <b style={{ fontSize: "1.2em" }}>Formats</b> pre-packaged HTML templates that users can create and share for Decks and Notes.
                <br /> With Formats, users will no longer need to worry about creating custom flashcard formats for each deck.

                <br /><br /> - <b style={{ fontSize: "1.2em" }}> Online/Offline Yomichan for Desktop</b> free language learners from depending on online subtitle translation and vocab-card creation tools.
                 StudyChan will work offline on user's desktops and will work outside of web-browsers.
            </p>

            <br /><br />
        </>
    );
};

export default Body_Studychan;

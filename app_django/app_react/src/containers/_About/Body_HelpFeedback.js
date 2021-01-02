import React, { useState } from "react";

// import useWindowDimensions from "../../redux/misc/windowDimensions";
// import { RESPONSIVE_WIDTH } from "../../redux/misc/constants";
// import axios from "../../redux/authentication/axios";

import { Button, Modal, Divider } from "antd";
import { FormOutlined } from "@ant-design/icons";
import Item_Feedback_Form from "../../components/Item_Feedback_Form";
import List_Feedback from "../../components/List_Feedback";

const Body_HelpFeedback = (props) => {
    // const { height, width } = useWindowDimensions();

    // let res_tab_deck = null;
    // let res_tab_group = null;
    // let res_tab_note = null;

    // if (width > RESPONSIVE_WIDTH) {
    //     res_tab_deck = "Decks";
    //     res_tab_group = "Groupdecks";
    //     res_tab_note = "Notes";
    // }

    const [visible_ask, setVisible_ask] = useState(false);

    return (
        <>
            <div style={{ padding: "25px" }}>
                <Button type="primary" onClick={() => setVisible_ask(true)}>
                    <FormOutlined />
                    Ask a new question
                </Button>
            </div>

            <h3>Your past questions: </h3>

            <Modal
                title="Post a Question"
                visible={visible_ask}
                onOk={() => setVisible_ask(false)}
                onCancel={() => setVisible_ask(false)}
                footer={[]}
            >
                <Item_Feedback_Form />
            </Modal>

            <Divider type={"horizontal"} />

            <List_Feedback />
        </>
    );
};

export default Body_HelpFeedback;

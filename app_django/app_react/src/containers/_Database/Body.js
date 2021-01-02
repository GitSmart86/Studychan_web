import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import List_User from "../../components/List_User";
import List_Phylum from "../../components/List_Phylum";

import { QuestionCircleOutlined } from "@ant-design/icons";

import { Collapse } from "antd";
const { Panel } = Collapse;

function Body_Database(props) {
    const [users, setUsers] = useState(null);
    const [ccpicks, setCcpicks] = useState(null);
    const [decks, setDecks] = useState(null);
    const [formats, setFormats] = useState(null);
    const [groupdecks, setGroupdecks] = useState(null);
    const [notes, setNotes] = useState(null);

    const results = useSelector((state) => state.databaseQueryResults);
    useEffect(() => {
        if (results != null) {
            setUsers(results.user_data);
            setCcpicks(results.ccpick_data);
            setDecks(results.deck_data);
            setFormats(results.format_data);
            setGroupdecks(results.groupdeck_data);
            setNotes(results.note_data);
        }
    }, [results]);

    return (
        <Collapse
            bordered={true}
            defaultActiveKey={["1", "2", "3", "4", "5", "6"]}
        >
            {users ? (
                <Panel
                    header="Users: "
                    key="1"
                    extra={<QuestionCircleOutlined />}
                >
                    <List_User data={users} />
                </Panel>
            ) : null}

            {ccpicks ? (
                <Panel
                    header="ccPicks: "
                    key="2"
                    extra={<QuestionCircleOutlined />}
                >
                    <List_Phylum phylum={"ccpick"} data={ccpicks} />
                </Panel>
            ) : null}

            {decks ? (
                <Panel
                    header="Decks: "
                    key="3"
                    extra={<QuestionCircleOutlined />}
                >
                    <List_Phylum phylum={"deck"} data={decks} />
                </Panel>
            ) : null}

            {groupdecks ? (
                <Panel
                    header="Groupdecks: "
                    key="4"
                    extra={<QuestionCircleOutlined />}
                >
                    <List_Phylum phylum={"groupdeck"} data={groupdecks} />
                </Panel>
            ) : null}

            {formats ? (
                <Panel
                    header="Format: "
                    key="5"
                    extra={<QuestionCircleOutlined />}
                >
                    <List_Phylum phylum={"format"} data={formats} />
                </Panel>
            ) : null}

            {notes ? (
                <Panel
                    header="Notes: "
                    key="6"
                    extra={<QuestionCircleOutlined />}
                >
                    <List_Phylum phylum={"note"} data={notes} />
                </Panel>
            ) : null}
        </Collapse>
    );
}

{
    /* <h2> Create an article </h2>
            <CustomForm
                requestType="post"
                contentId={null}
                btnText="Create"
                history={props.history}
            /> */
}

export default Body_Database;

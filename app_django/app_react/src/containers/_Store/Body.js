// import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import List_Store from "../../components/List_Store";

import { MehTwoTone } from "@ant-design/icons";
import { Space } from "antd";

function Body_Store(props) {
    const [deeds, setDeeds] = useState(null);
    const [addons, setAddons] = useState(null);
    const [themes, setThemes] = useState(null);

    const results = useSelector((state) => state.storeQueryResults);
    useEffect(() => {
        if (results != null) {
            setDeeds(results.deed_data);
            setAddons(results.addon_data);
            setThemes(results.theme_data);
        }
    }, [results]);

    return (
        <div>

            <Space align="center" direction="horizontal" size="large">
                <MehTwoTone style={{ fontSize: '48px' }} />
                <h3>Work in progress...</h3>
            </Space>
            <br /><br />
            <p>* In the future, users will be able to purchase optional content:</p>
            <br /><br />
            <p>... Deeds reserve cloud space for users to upload and sync personal study content across their devices.</p>
            <br /><br />
            <p>... Addons are visual and audio prompts and queues that users can buy to liven up study sessions.</p>
            <br /><br />
            <p>... Themes vary the color scheme of StudyChan .com/.exe/.apk for users.</p>
            <br /><br />

            {deeds ? <List_Store phylum={"deed"} data={deeds} /> : null}

            {addons ? <List_Store phylum={"addon"} data={addons} /> : null}

            {themes ? <List_Store phylum={"theme"} data={themes} /> : null}
        </div >
    );
}

export default Body_Store;

import { useSelector } from "react-redux";
import React, { } from "react";

// import axios from "../../redux/authentication/axios";

import Body_Private from "./Body_Private_View";
import Body_Public from "./Body_Public_View";

const Body = (props) => {
    const userId = useSelector((state) => state.userId);
    const accountId = props.match.params.accountId;

    return (
        <>
            {userId == accountId ? (
                <Body_Private accountId={accountId} />
            ) : (
                    <Body_Public accountId={accountId} />
                )}
        </>
    );
};

export default Body;

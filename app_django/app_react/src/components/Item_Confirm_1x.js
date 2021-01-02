import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { Row, Button, Divider } from "antd";

const Item_Confirm_Form_1x = (props) => {
    const [visible_submit, setVisible_submit] = useState(false);
    const [redirect, setRedirect] = useState(false);

    if (redirect) return <Redirect to={props.NavLink} />

    return visible_submit ? (
        <>
            <span>Do you want to save?</span>
            <Row>
                <Button
                    type="danger"
                    htmlType="submit"
                    onClick={() => {
                        setVisible_submit(false);
                        setRedirect(true);
                        props.Form.submit();
                        // props.history.push(props.NavLink);
                        // return <Redirect to={props.NavLink} />
                    }}
                >
                    Save
                </Button>
                <Divider type="vertical" />
                <Button type="primary" onClick={() => setVisible_submit(false)}>
                    Cancel
                </Button>
            </Row>
        </>
    ) : (
            <>
                <Button type="primary" onClick={() => setVisible_submit(true)}>
                    Save
                </Button>

                <Divider type="vertical" />
                <Button>
                    <NavLink to={props.NavLink}>Cancel</NavLink>
                </Button>
            </>
        );
};

export default Item_Confirm_Form_1x;

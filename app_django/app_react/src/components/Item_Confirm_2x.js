import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { Row, Button, Divider } from "antd";

const Item_Confirm_Form_2x = (props) => {
    const [visible_delete_1st, setVisible_delete_1st] = useState(false);
    const [visible_delete_2nd, setVisible_delete_2nd] = useState(false);

    return (
        <>
            {!visible_delete_1st && !visible_delete_2nd && (
                <Button
                    type="danger"
                    onClick={() => {
                        setVisible_delete_1st(true);
                        setVisible_delete_2nd(false);
                    }}
                >
                    Delete Your {props.typeName}
                </Button>
            )}

            {visible_delete_1st && !visible_delete_2nd && (
                <>
                    <span>Do you want to delete your {props.typeName}?</span>
                    <Row>
                        <Button
                            type="primary"
                            onClick={() => {
                                setVisible_delete_1st(false);
                                setVisible_delete_2nd(false);
                            }}
                        >
                            No, Cancel
                        </Button>

                        <Divider type="vertical" />

                        <Button
                            type="danger"
                            onClick={() => {
                                setVisible_delete_1st(false);
                                setVisible_delete_2nd(true);
                            }}
                        >
                            Yes, Delete
                        </Button>
                    </Row>
                </>
            )}

            {!visible_delete_1st && visible_delete_2nd && (
                <>
                    <span>
                        Are you sure that you want to delete your {props.typeName}?
                    </span>
                    <Row>
                        <Button
                            type="primary"
                            onClick={() => {
                                setVisible_delete_1st(false);
                                setVisible_delete_2nd(false);
                            }}
                        >
                            No, Cancel
                        </Button>

                        <Divider type="horizontal" />

                        <Button
                            type="danger"
                            onClick={() => {
                                setVisible_delete_1st(false);
                                setVisible_delete_2nd(false);
                                props.onClick();
                            }}
                        >
                            Yes, really Delete
                        </Button>
                    </Row>
                </>
            )}
        </>
    );
};

export default Item_Confirm_Form_2x;

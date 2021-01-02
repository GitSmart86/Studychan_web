import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { UserOutlined, UnlockFilled, SyncOutlined } from "@ant-design/icons";

import * as actions from "../../redux/authentication/actions/auth";

const NormalLoginForm = (props) => {
    const [form] = Form.useForm();

    const handleSubmit = (event) => {
        console.log(props, event);
        props.onAuth(event.userName, event.password);
        // props.history.push("/");
    };

    const onFinish = (values) => {
        console.log(values);
    };

    return props.loading ? (
        <SyncOutlined style={{ fontSize: 24 }} spin />
    ) : (
            <div>
                <Form
                    form={form}
                    name="control-hooks"
                    onFinish={(onFinish, handleSubmit)}
                >
                    <Form.Item
                        name="userName"
                        label="Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        );
};

// function WrappedNormalLoginForm() {

//     return Form.useForm()(NormalLoginForm);
//   }

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (username, password) =>
            dispatch(actions.authLogin(username, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);

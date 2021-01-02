import React from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/authentication/actions/auth";

import { Form, Input, Tooltip, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const RegistrationForm = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        props.onAuth(
            values.userName,
            values.email,
            values.password,
            values.confirm
        );
        // props.history.push("/");
    };

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid E-mail!",
                    },
                    {
                        required: true,
                        message: "Please input your E-mail!",
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
                        message: "Please input your password!",
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(
                                "The two passwords that you entered do not match!"
                            );
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="userName"
                label={
                    <span>
                        Name&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: "Please input your name!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (username, email, password1, password2) =>
            dispatch(actions.authSignup(username, email, password1, password2)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

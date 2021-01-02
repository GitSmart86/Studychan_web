import querystring from "querystring";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "../../redux/authentication/axios";
import * as actions from "../../redux/authentication/actions/auth";

import { Form, Input, Button, Select, Layout, Radio } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { Option } = Select;

const Sider_Store = (props) => {
    const [siderCollapsed, setSiderCollapsed] = useState(false);
    const [radioValue, setRadioValue] = useState("deed");
    var storeSearchTags = useSelector((state) => state.localStoreTags);

    let dispatch = useDispatch();
    const [form] = Form.useForm();

    const options = [
        { label: "Deeds", value: "deed" },
        { label: "Addons", value: "addon" },
        { label: "Themes", value: "theme" },
    ];

    const onRadioChange = (e) => {
        setRadioValue(e.target.value);
    };

    const Sider_Store = async (event) => {
        let _name = {};
        let _stores = {};
        let _tags = {};

        if (event.name) {
            _name = { name: event.name };
        }
        if (event.storeRadios) {
            _stores = { phylums: event.storeRadios };
        }
        if (event.tags) {
            _tags = { tags: event.tags };
        }

        const data = {
            ..._name,
            ..._stores,
            ..._tags,
        };

        console.log("DATA: ", data);

        const urlData = querystring.stringify(data);

        axios
            .get(`http://127.0.0.1:8000/api/store_search/?${urlData}`)
            .then((response) => {
                console.log("RESPONSE: ", response.data);
                dispatch(actions.setStoreQueryResults(response.data));
                props.history.push(`/store/`);
            })
            .catch((error) => console.error(error));
    };

    return (
        <Sider
            className="site-layout-background"
            width={200}
            collapsible
            trigger={null}
            collapsed={siderCollapsed}
            theme="light"
        >
            <Button
                className="trigger"
                onClick={() => setSiderCollapsed(!siderCollapsed)}
                style={{ width: "100%" }}
                type="primary"
            >
                {siderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>

            <Form form={form} onFinish={(event) => Sider_Store(event)}>
                <Form.Item name="name">
                    <Input placeholder="input content's name" />
                </Form.Item>

                <Form.Item
                    name="storeRadios"
                    label="Store Categories"
                    rules={[
                        {
                            required: true,
                            message: "Please select a something to search!",
                        },
                    ]}
                >
                    <Radio.Group
                        options={options}
                        onChange={onRadioChange}
                        value={radioValue}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Form.Item>

                <Form.Item
                    name="tags"
                    label="Select Tags"
                    rules={[
                        {
                            type: "array",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Please select favourite colors"
                    >
                        {storeSearchTags
                            ? storeSearchTags.map((tag) => (
                                <Option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </Option>
                            ))
                            : null}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Search
                    </Button>
                </Form.Item>
            </Form>
        </Sider>
    );
};

export default Sider_Store;

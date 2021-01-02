import querystring from "querystring";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Select, Layout } from "antd";

import axios from "../../redux/authentication/axios";
import * as actions from "../../redux/authentication/actions/auth";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { Option } = Select;

const Sider_Database = (props) => {
    const [siderCollapsed, setSiderCollapsed] = useState(false);
    var dbSearchTags = useSelector((state) => state.localDBTags);
    var userId = useSelector((state) => state.userId);

    let dispatch = useDispatch();

    const [form] = Form.useForm();

    const Sider_Database = async (event) => {
        // const data = {
        //     params: {
        //         namid: event.namid,
        //         phylums: event.phylumCheckboxes,
        //         tags: event.tags,
        //         ID: 12345,
        //     }
        // };

        let _namid = {};
        let _phylums = {};
        let _tags = {};

        if (event.namid) {
            _namid = { namid: event.namid };
        }
        if (event.phylumCheckboxes) {
            _phylums = { phylums: event.phylumCheckboxes };
        }
        if (event.tags) {
            _tags = { tags: event.tags };
        }

        const data = {
            ..._namid,
            ..._phylums,
            ..._tags,
        };

        // console.log("DATA: ", data);

        const urlData = querystring.stringify(data);

        console.log(`api/database_search/?asker_id=${userId}&${urlData}`)

        axios
            .get(`api/database_search/?asker_id=${userId}&${urlData}`)
            .then((response) => {
                console.log("RESPONSE: ", response.data);
                dispatch(actions.setDBQueryResults(response.data));
                props.history.push(`/database/`);
            })
            .catch((error) => console.error(error));
    };

    return (
        <Sider
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

            <Form form={form} onFinish={(event) => Sider_Database(event)}>
                <Form.Item name="namid">
                    <Input placeholder="input content's name or id" />
                </Form.Item>

                <Form.Item
                    name="phylumCheckboxes"
                    label="Phyla"
                    rules={[
                        {
                            required: true,
                            message: "Please select a phylum to search!",
                        },
                    ]}
                >
                    <Checkbox.Group required>
                        <Checkbox
                            value="ccpick"
                            style={{
                                lineHeight: "32px",
                            }}
                        >
                            ccPicks
                        </Checkbox>

                        <Checkbox
                            value="deck"
                            style={{
                                lineHeight: "32px",
                            }}
                        >
                            Decks
                        </Checkbox>

                        <Checkbox
                            value="groupdeck"
                            style={{
                                lineHeight: "32px",
                            }}
                        >
                            Groupdecks
                        </Checkbox>

                        <Checkbox
                            value="note"
                            style={{
                                lineHeight: "32px",
                            }}
                        >
                            Notes
                        </Checkbox>

                        <Checkbox
                            value="format"
                            style={{
                                lineHeight: "32px",
                            }}
                        >
                            Formats
                        </Checkbox>

                        <Checkbox
                            value="user"
                            style={{
                                lineHeight: "32px",
                            }}
                        >
                            Users
                        </Checkbox>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item
                    name="tags"
                    label="Select Tags"
                    rules={[
                        {
                            // required: true,
                            // message: "Please select your favourite colors!",
                            type: "array",
                        },
                    ]}
                >
                    <Select mode="multiple">
                        {dbSearchTags &&
                            dbSearchTags.map((tag) => (
                                <Option key={tag.id} value={tag.name}>
                                    {tag.name}
                                </Option>
                            ))}
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

export default Sider_Database;

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             checkedList: [],
//             checkAll: false,
//         };
//     }

//     render() {
//         return (
//             <div>
//                 <div style={{ borderBottom: "1px solid #E9E9E9" }}>
//                     <Checkbox
//                         onChange={this.onCheck}
//                         checked={this.state.checkAll}
//                     >
//                         Check all
//                     </Checkbox>
//                 </div>
//                 <br />
//                 <Checkbox.Group
//                     value={this.state.checkedList}
//                     onChange={this.onGroupChange}
//                 >
//                     <Checkbox value={101}>option 1</Checkbox>
//                     <Checkbox value={102}>option 2</Checkbox>
//                 </Checkbox.Group>
//             </div>
//         );
//     }

//     onGroupChange = (checkedList) => {
//         this.setState({
//             checkedList,
//         });
//     };

//     onCheck = (e) => {
//         this.setState({
//             checkedList: e.target.checked ? [101, 102] : [],
//             checkAll: e.target.checked,
//         });
//     };
// }

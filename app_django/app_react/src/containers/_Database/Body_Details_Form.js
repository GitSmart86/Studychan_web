import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../redux/authentication/axios";

import {
    List,
    Avatar,
    Card,
    Rate,
    Space,
    Progress,
    Row,
    Drawer,
    Form,
    Input,
    Button,
    Switch,
    Popconfirm,
    message,
    Popover,
    Modal,
    Menu,
    Select,
    Upload,
    Col,
    Divider,
} from "antd";
import {
    RightCircleTwoTone,
    EditOutlined,
    LikeOutlined,
    DislikeOutlined,
    BellOutlined,
    LoadingOutlined,
    PlusOutlined,
    UploadOutlined,
    InboxOutlined,
    FrownOutlined,
    PictureOutlined,
    SoundOutlined,
} from "@ant-design/icons";
import { LOCALHOST } from "../../redux/misc/constants";

import List_Tag from "../../components/List_Tag";
import List_Rev from "../../components/List_Rev";
import List_Sample from "../../components/List_Sample";
import Item_Confirm_Form_1x from "../../components/Item_Confirm_1x";
import Item_Confirm_Form_2x from "../../components/Item_Confirm_2x";

const { SubMenu } = Menu;
const { Dragger } = Upload;
const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const Body_Details_Form = (props) => {
    const [form] = Form.useForm();

    const props_id = props.match.params.id;
    const props_mode = props.match.params.mode;
    const props_phylum = props.match.params.phylum;
    const junct_img_key = `${props_phylum}_img`;
    const junct_snd_key = `${props_phylum}_snd`;

    var dbSearchTags = useSelector((state) => state.localDBTags);
    const userId = useSelector((state) => state.userId);

    const [visible_samples, setVisible_samples] = useState(false);
    const [visible_submit, setVisible_submit] = useState(false);
    const [visible_delete_1st, setVisible_delete_1st] = useState(false);
    const [visible_delete_2nd, setVisible_delete_2nd] = useState(false);
    const [valid_name, setValid_name] = useState(true);

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(false);

    const handleFormSubmit = async (event, requestType, contentId) => {
        console.log("EVENT: ", event);
        let form_data = new FormData();

        if (event) {
            form_data.append("owner", userId);
            form_data.append("id", contentId);
            form_data.append("phylum", props_phylum);
            form_data.append("name", event.name);
            form_data.append("description", event.description);
            form_data.append(
                "isPublished",
                event.isPublished ? event.isPublished : false
            );
            form_data.append("tags", event.tags);
            if (event.format_type)
                form_data.append("format_type", event.format_type);
            if (event.note_contents)
                form_data.append("note_contents", event.note_contents);
            if (iconList[0] && iconList[0].name !== null)
                form_data.append("icon", iconList[0].originFileObj);

            if (fileList_Img !== null) {
                fileList_Img.map((img) => {
                    if (img.noChange && img.noChange === true) {
                        var newFile = new File([], img.name, {
                            type: "noChange",
                        });
                        form_data.append(img.name, newFile);
                    } else {
                        form_data.append(
                            img.originFileObj.name,
                            img.originFileObj
                        );
                    }
                });
            }

            if (fileList_Snd !== null) {
                fileList_Snd.map((snd) => {
                    if (snd.noChange && snd.noChange === true) {
                        var newFile = new File([], snd.name, {
                            type: "noChange",
                        });
                        form_data.append(snd.name, newFile);
                    } else {
                        form_data.append(
                            snd.originFileObj.name,
                            snd.originFileObj
                        );
                    }
                });
            }
            // Log the key/value pairs
            for (var pair of form_data.entries()) {
                console.log(pair[0] + " - " + pair[1]);
            }
            // return;
        }
        switch (requestType) {
            case "create":
                await axios
                    .post(`api/${props_phylum}/`, form_data, {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    })
                    .then((res) => {
                        if (res.status === 201) {
                            message.success(
                                `Successfuly created ${props_phylum}!`
                            );
                            // props.history.push(
                            //     `/database/${props_phylum}/${props_id}`
                            // );
                        }
                    })
                    .catch((error) => console.error(error));
                break;

            case "edit":
                await axios
                    .put(
                        `api/${props_phylum}/${contentId}/`,
                        form_data,
                        {
                            headers: {
                                "content-type": "multipart/form-data",
                            },
                        }
                    )
                    .then((res) => {
                        if (res.status === 200) {
                            message.success(
                                `Successfuly edited ${props_phylum}!`
                            );
                            // props.history.push(`/deck/${contentId}`);
                        }
                    })
                    .catch((error) => console.error(error));
                break;

            case "delete":
                if (props_mode !== "create") {
                    await axios
                        .delete(`api/${props_phylum}/${contentId}/`)
                        .then((res) => {
                            if (res.status === 200) {
                                message.success(
                                    `Successfuly deleted ${props_phylum}!`
                                );
                            }
                        })
                        .catch((error) => console.error(error));
                }
                form.resetFields();
                props.history.push(`/account/${userId}`);
                break;

            default:
                return null;
        }
    };

    const [data, setData] = useState(null);
    const [iconList, setIconList] = useState([]);
    const [fileList_Img, setFileList_Img] = useState(null);
    const [fileList_Snd, setFileList_Snd] = useState(null);
    const [visible_Junct_Img, setVisible_Junct_Img] = useState(false);
    const [visible_Junct_Snd, setVisible_Junct_Snd] = useState(false);
    useEffect(() => {
        if (props_mode === "create") {
            setData([]);
        } else {
            axios
                .get(`api/${props_phylum}/${props_id}/`)
                .then((response) => {
                    console.log("RESPONSE: ", response.data);
                    setData(response.data);
                    setIconList([
                        {
                            uid: "-1",
                            name: "",
                            status: "done",
                            url: response.data.icon ? response.data.icon : "",
                            thumbUrl: response.data.icon
                                ? response.data.icon
                                : "",
                        },
                    ]);

                    let jpgs = [];
                    response.data[junct_img_key] &&
                        response.data[junct_img_key].map((jpg) => {
                            jpgs.push({
                                uid: jpgs.length,
                                name: jpg.name,
                                status: "done",
                                url: jpg.img,
                                thumbUrl: jpg.img,
                                noChange: true,
                                type: "image/jpeg",
                            });
                        });
                    setFileList_Img(jpgs);

                    let mp3s = [];
                    response.data[junct_snd_key] &&
                        response.data[junct_snd_key].map((mp3) => {
                            mp3s.push({
                                uid: mp3s.length,
                                name: mp3.name,
                                status: "done",
                                url: mp3.snd,
                                noChange: true,
                                type: "audio/mpeg",
                            });
                        });
                    setFileList_Snd(mp3s);
                })
                .catch((error) => console.error(error));
        }
    }, [props_mode]);

    const [formatTypes, setFormatTypes] = useState(null);
    useEffect(() => {
        (props_phylum === "deck" ||
            props_phylum === "groupdeck" ||
            props_phylum === "note") &&
            axios
                .get(`api/format/?isPublished=true`)
                .then((response) => {
                    // console.log("FORMATS: ", response.data);
                    setFormatTypes(response.data);
                })
                .catch((error) => console.error(error));
    }, [props_phylum]);

    const image_formats = ["image/png", "image/jpeg", "image/pjpeg"];
    function onChange_Icon(fileList) {
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //     message.error("Image must smaller than 2MB!");
        // }
        fileList = fileList.slice(-1)[0];
        console.log(fileList);
        if (fileList === undefined) return
        if (image_formats.includes(fileList.type)) setIconList([fileList]);
    }

    function onChange_Junct_Img(fileList) {
        const image_formats = [
            "image/png",
            "image/jpeg",
            "image/pjpeg",
            "image/gif",
        ];
        let newFileList = [];
        fileList.map((file) => {
            // console.log(file.type);
            if (image_formats.includes(file.type)) newFileList.push(file);
        });
        setFileList_Img(newFileList);
    }

    function onChange_Junct_Snd(fileList) {
        console.log(fileList);
        const audio_formats = [
            "audio/mpeg3",
            "audio/x-mpeg-3",
            "audio/mpeg",
            "video/x-mpeg",
            "video/mpeg",
        ];
        let newFileList = [];
        fileList.map((file) => {
            console.log(file.type);
            if (audio_formats.includes(file.type)) newFileList.push(file);
        });
        setFileList_Snd(newFileList);
    }

    return data && data.owner && data.owner != userId ? (
        <>
            <p style={{ padding: "20%", fontSize: "25px" }}>
                <FrownOutlined /> You do not own this content, <br />
                <NavLink to="/"> go away! </NavLink>
            </p>
        </>
    ) : (
            <>
                {!data ? (
                    <LoadingOutlined
                        style={{ fontSize: "100px", padding: "10%" }}
                    />
                ) : (
                        <>
                            <Form
                                form={form}
                                onFinish={(event) => {
                                    setVisible_submit(false);
                                    handleFormSubmit(event, props_mode, props_id);
                                }}
                                {...formItemLayout}
                                // props_mode !== "create" &&
                                // data.name &&
                                initialValues={{
                                    name: data.name && data.name,
                                    format_type: data.format_type && data.format_type,
                                    isPublished: data.isPublished && data.isPublished,
                                    description: data.description && data.description,
                                    note_contents:
                                        data.note_contents && data.note_contents,
                                    tags:
                                        data.tags &&
                                        data.tags.map((tag) => {
                                            return tag.name;
                                        }),
                                }}
                            >
                                <Row justify="space-around">
                                    <Col
                                        sm={{ span: 10, offset: 2 }}
                                        lg={{ span: 6, offset: 3 }}
                                    >
                                        {props_id === "new" ? (
                                            <Item_Confirm_Form_1x
                                                NavLink={`/account/${userId}`}
                                                Form={form}
                                            />
                                        ) : (
                                                <Item_Confirm_Form_1x
                                                    NavLink={`/database/${props_phylum}/${props_id}`}
                                                    Form={form}
                                                />
                                            )}
                                    </Col>

                                    <Col
                                        sm={{ span: 10, offset: 2 }}
                                        lg={{ span: 6, offset: 3 }}
                                    >
                                        {props_mode === "create" ? (
                                            <Button
                                                type="danger"
                                                onClick={() => {
                                                    form.resetFields();
                                                    props.history.push(
                                                        `/account/${userId}`
                                                    );
                                                }}
                                            >
                                                Cancel new {props_phylum}
                                            </Button>
                                        ) : (
                                                <Item_Confirm_Form_2x
                                                    typeName="Format"
                                                    onClick={() => {
                                                        handleFormSubmit(
                                                            null,
                                                            "delete",
                                                            props_id
                                                        );
                                                    }}
                                                />
                                            )}
                                    </Col>
                                </Row>

                                <Divider type="horizontal" />

                                <Row justify="center">
                                    <span
                                        style={{
                                            width: "300px",
                                        }}
                                    >
                                        <Upload
                                            accept="image/x-png,image/jpeg"
                                            listType="picture-card"
                                            fileList={iconList}
                                            beforeUpload={() => false}
                                            onPreview={(file) => {
                                                setPreviewImage(file.thumbUrl);
                                                setPreviewVisible(true);
                                            }}
                                            onChange={(event) => {
                                                onChange_Icon(event.fileList);
                                            }}
                                        >
                                            <EditOutlined />
                                        </Upload>

                                        <Modal
                                            visible={previewVisible}
                                            footer={null}
                                            onCancel={() => setPreviewVisible(false)}
                                        >
                                            <img
                                                alt="example"
                                                style={{ width: "100%" }}
                                                src={previewImage}
                                            />
                                        </Modal>
                                    </span>
                                </Row>

                                <Form.Item
                                    name="isPublished"
                                    label="Published"
                                    valuePropName="checked"
                                >
                                    <Switch />
                                </Form.Item>

                                <Row
                                    justify="center"
                                    style={{
                                        // position: "absolute",
                                        // left: "30%",
                                        paddingBottom: "20px",
                                    }}
                                >
                                    {(props_phylum === "ccpick" ||
                                        props_phylum === "note") && (
                                            <>
                                                <Button
                                                    type="primary"
                                                    onClick={() =>
                                                        setVisible_Junct_Img(true)
                                                    }
                                                >
                                                    Images
                                    </Button>
                                                <Drawer
                                                    title="Images: "
                                                    placement="right"
                                                    closable={false}
                                                    onClose={() =>
                                                        setVisible_Junct_Img(false)
                                                    }
                                                    visible={visible_Junct_Img}
                                                >
                                                    <div
                                                        style={{
                                                            width: "100%",
                                                            height: "100px",
                                                        }}
                                                    >
                                                        <Dragger
                                                            accept="image/x-png,image/gif,image/jpeg"
                                                            multiple={true}
                                                            listType="picture"
                                                            fileList={fileList_Img}
                                                            onChange={(event) =>
                                                                onChange_Junct_Img(
                                                                    event.fileList
                                                                )
                                                            }
                                                            beforeUpload={() => false}
                                                        >
                                                            <Row
                                                                align="middle"
                                                                justify="center"
                                                            >
                                                                <PlusOutlined
                                                                    style={{
                                                                        fontSize: "16px",
                                                                    }}
                                                                />
                                                                <PictureOutlined
                                                                    style={{
                                                                        fontSize: "24px",
                                                                    }}
                                                                />
                                                            </Row>
                                                        </Dragger>
                                                    </div>
                                                </Drawer>
                                            </>
                                        )}

                                    {/* {data[junct_snd_key] && ( */}
                                    {props_phylum === "note" && (
                                        <>
                                            <Divider type="vertical" />
                                            <Button
                                                type="primary"
                                                onClick={() =>
                                                    setVisible_Junct_Snd(true)
                                                }
                                            >
                                                Sounds
                                    </Button>
                                            <Drawer
                                                title="Sounds: "
                                                placement="right"
                                                closable={false}
                                                onClose={() =>
                                                    setVisible_Junct_Snd(false)
                                                }
                                                visible={visible_Junct_Snd}
                                            >
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: "100px",
                                                    }}
                                                >
                                                    <Dragger
                                                        accept="audio/mpeg,audio/x-mpeg-3,audio/mpeg3"
                                                        multiple={true}
                                                        listType="picture"
                                                        fileList={fileList_Snd}
                                                        onChange={(event) =>
                                                            onChange_Junct_Snd(
                                                                event.fileList
                                                            )
                                                        }
                                                        beforeUpload={() => false}
                                                    >
                                                        {iconList.length >= 8 ? null : (
                                                            <Row
                                                                align="middle"
                                                                justify="center"
                                                            >
                                                                <PlusOutlined
                                                                    style={{
                                                                        fontSize:
                                                                            "16px",
                                                                    }}
                                                                />
                                                                <SoundOutlined
                                                                    style={{
                                                                        fontSize:
                                                                            "24px",
                                                                    }}
                                                                />
                                                            </Row>
                                                        )}
                                                    </Dragger>
                                                </div>
                                            </Drawer>
                                        </>
                                    )}
                                </Row>

                                <Form.Item
                                    name="name"
                                    label="Name: "
                                    rules={[
                                        {
                                            required: true,
                                            message: "You need a non-numeric name.",
                                            isNumeric: false,
                                        },
                                    ]}
                                    validateStatus={valid_name ? null : "error"}
                                    help={
                                        valid_name
                                            ? null
                                            : "You need a non-numeric name."
                                    }
                                >
                                    <Input
                                        onChange={(e) => {
                                            isNaN(e.target.value)
                                                ? setValid_name(true)
                                                : setValid_name(false);
                                        }}
                                        placeholder={data.name}
                                    />
                                </Form.Item>

                                {(props_phylum === "deck" ||
                                    props_phylum === "groupdeck" ||
                                    props_phylum === "note") && (
                                        <Form.Item
                                            name="format_type"
                                            label="Format: "
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "You need a format for your content.",
                                                },
                                            ]}
                                        >
                                            <Select
                                                showSearch={true}
                                                placeholder={data && data.format_type}
                                            >
                                                {formatTypes &&
                                                    formatTypes.map((format) => (
                                                        <Option
                                                            key={format.name}
                                                            value={format.name}
                                                        >
                                                            {format.name}
                                                        </Option>
                                                    ))}
                                            </Select>
                                        </Form.Item>
                                    )}

                                <Form.Item
                                    name="tags"
                                    label="Tags"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please select tags for your content!",
                                            type: "array",
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder={
                                            data.tags &&
                                            data.tags.map((tag) => {
                                                return `${tag.name} _ `;
                                            })
                                        }
                                    >
                                        {dbSearchTags &&
                                            dbSearchTags.map((tag) => (
                                                <Option key={tag.id} value={tag.name}>
                                                    {tag.name}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="description"
                                    label="Description:"
                                    rules={[
                                        {
                                            required: true,
                                            message: "You need a description.",
                                        },
                                    ]}
                                >
                                    <TextArea rows={50} placeholder={data.description} />
                                </Form.Item>

                                {props_phylum === "note" && (
                                    <Form.Item
                                        name="note_contents"
                                        label="Note Content: "
                                        rules={[
                                            {
                                                required: true,
                                                message: "You need a note content.",
                                            },
                                        ]}
                                    >
                                        <Input placeholder={data.note_contents} />
                                    </Form.Item>
                                )}
                            </Form>
                        </>
                    )}
            </>
        );
};

export default Body_Details_Form;

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
} from "@ant-design/icons";
import { LOCALHOST } from "../../redux/misc/constants";

import List_Tag from "../../components/List_Tag";
import List_Rev from "../../components/List_Rev";
import List_Sample from "../../components/List_Sample";

const { SubMenu } = Menu;

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
    var dbSearchTags = useSelector((state) => state.localDBTags);
    const userId = useSelector((state) => state.userId);

    const [visible_samples, setVisible_samples] = useState(false);
    const [visible_submit, setVisible_submit] = useState(false);
    const [valid_name, setValid_name] = useState(true);
    const [icon, setIcon] = useState([]);
    const [iconSend, setIconSend] = useState([]);
    const [iconPreview, setIconPreview] = useState([]);

    const handleFormSubmit = async (event, requestType, contentId) => {
        // event.preventDefault();
        console.log("EVENT: ", event);

        // const data = {
        //     name: event.name,
        // description: event.description,
        // isPublished: event.isPublished,
        // icon: event.icon.fileList
        // ? // ? event.icon.fileList[0].originFileObj
        //   event.icon.file
        //   cover
        // : cover,
        // : event.icon,
        // tags: event.tags,
        // };
        // if (event.format_type) data["format_type"] = event.format_type;
        // if (event.note_contents) data["note_contents"] = event.note_contents;
        // console.log("DATA: ", data);

        switch (requestType) {
            // case "create":
            //     await axios
            //         .post(`api/${props.match.params.phylum}/`, data, {
            //             headers: {
            //                 "content-type": "multipart/form-data",
            //             },
            //         })
            //         .then((res) => {
            //             if (res.status === 201) {
            //                 props.history.push(
            //                     `/database/${props.match.params.phylum}/${props.match.params.id}`
            //                 );
            //             }
            //         })
            //         .catch((error) => console.error(error));
            //     break;

            case "edit":
                console.log("Cover: ", cover);
                let form_data = new FormData();
                form_data.append("name", event.name);
                console.log(iconSend[0].originFileObj);
                // icon && form_data.append("icon", icon, "newFile");
                form_data.append("file", iconSend[0].originFileObj);
                // cover && form_data.append("icon", cover, cover.name);
                console.log("FORM_DATA: ", form_data);
                await axios
                    .put(
                        `http://localhost:8000/api/${props.match.params.phylum}/${contentId}/`,
                        // data,
                        form_data,
                        {
                            headers: {
                                "content-type": "multipart/form-data",
                            },
                        }
                    )
                    .then((res) => {
                        if (res.status === 200) {
                            // props.history.push(`/deck/${contentId}`);
                        }
                    })
                    .catch((error) => console.error(error));
                // form.resetFields();
                break;

            // case "delete":
            //     await axios
            //         .delete(`api/${props.match.params.phylum}/${contentId}/`)
            //         .then((res) => {
            //             if (res.status === 200) {
            //                 props.history.push(
            //                     `/database/${props.match.params.phylum}/${props.match.params.id}`
            //                 );
            //             }
            //         })
            //         .catch((error) => console.error(error));
            //     break;

            default:
                return null;
        }
    };

    const [data, setData] = useState(null);
    useEffect(() => {
        const id = props.match.params.id;
        const phylum = props.match.params.phylum;
        axios
            .get(`api/${phylum}/${id}`)
            .then((response) => {
                console.log("RESPONSE: ", response.data);
                setData(response.data);
                setIcon([
                    {
                        uid: "-1",
                        name: "original image",
                        status: "done",
                        url: response.data.icon ? response.data.icon : null,
                    },
                ]);
            })
            .catch((error) => console.error(error));
    }, []);

    // const [formatTypes, setFormatTypes] = useState(null);
    // useEffect(() => {
    //     axios
    //         .get(`api/format?isPublished=true`)
    //         .then((response) => {
    //             console.log("FORMATS: ", response.data);
    //             setFormatTypes(response.data);
    //         })
    //         .catch((error) => console.error(error));
    // }, []);

    // function beforeUpload(file) {
    //     // const isJpgOrPng =
    //     //     file.type === "image/jpeg" || file.type === "image/png";
    //     // if (!isJpgOrPng) {
    //     //     message.error("You can only upload JPG/PNG file!");
    //     // }
    //     // const isLt2M = file.size / 1024 / 1024 < 2;
    //     // if (!isLt2M) {
    //     //     message.error("Image must smaller than 2MB!");
    //     // }
    //     // return isJpgOrPng && isLt2M;
    //     return false;
    // }

    const onIconChange = (info) => {
        let iconList = [...info.fileList];
        iconList = iconList.slice(-1);

        // 2. Read from response and show file link
        iconList = iconList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
                console.log(file.url);
            }
            return file;
        });
        let file = new File(iconList, "nameIsNone", { type: "image/png" });
        // console.log("ADDED: ", file);
        setIconSend(info);
        setIcon(iconList);
    };

    const handlePreview = (file) => {
        setIconPreview(file.thumbUrl);
        // previewVisible: true
    };

    const [cover, setCover] = useState();
    return (
        data && (
            // userId == data.owner && (
            <>
                <Form
                    form={form}
                    onFinish={(event) => {
                        setVisible_submit(false);
                        handleFormSubmit(
                            event,
                            props.match.params.mode,
                            props.match.params.id
                        );
                    }}
                    {...formItemLayout}
                    initialValues={{
                        // icon: data && "no change",
                        name: data && data.name,
                        // format_type: data && data.format_type,
                        // isPublished: data && data.isPublished,
                        // description: data && data.description,
                        // note_contents: data && data.note_contents,
                        // tags:
                        //     data &&
                        //     data.tags.map((tag) => {
                        //         return tag.name;
                        //     }),
                    }}
                >
                    {/* <input
                        type="file"
                        id="image"
                        accept="image/png, image/jpeg"
                        // onChange={this.handleImageChange}
                        onChange={(evt) => setCover(evt.target.files[0])}
                    /> */}
                    {/* <Form.Item
                        wrapperCol={{
                            span: 12,
                            offset: 6,
                        }}
                    >
                        {visible_submit ? (
                            <>
                                <span>Do you want to save changes?</span>
                                <Row> */}
                    <Button type="danger" htmlType="submit">
                        Save
                    </Button>
                    {/* <Button
                                        type="primary"
                                        onClick={() => setVisible_submit(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Row>
                            </>
                        ) : (
                            <>
                                <Button
                                    type="primary"
                                    onClick={() => setVisible_submit(true)}
                                >
                                    Save
                                </Button>
                                <Button>
                                    <NavLink
                                        to={`/database/${props.match.params.phylum}/${props.match.params.id}`}
                                    >
                                        Done
                                    </NavLink>
                                </Button>
                            </>
                        )}
                    </Form.Item> */}
                    <Form.Item name="icon" label="Icon: ">
                        <Upload
                            listType="picture-card"
                            fileList={icon}
                            onChange={onIconChange}
                            beforeUpload={() => false}
                            onPreview={handlePreview}
                        >
                            <EditOutlined />
                            <p>Change Icon</p>
                        </Upload>
                    </Form.Item>
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
                            valid_name ? null : "You need a non-numeric name."
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
                    {/* {data.format_type && (
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
                    )} */}
                    {/* <Form.Item
                        name="tags"
                        label="Tags"
                        rules={[
                            {
                                required: true,
                                message: "Please select tags for your content!",
                                type: "array",
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            placeholder={
                                data &&
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
                    </Form.Item> */}
                    {/* <Form.Item
                        name="isPublished"
                        label="Published"
                        valuePropName="checked"
                    >
                        <Switch />
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
                        <Input placeholder={data.description} />
                    </Form.Item>
                    {data.note_contents && (
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
                    {data.sample ? (
                        <>
                            <Button
                                type="primary"
                                onClick={() => setVisible_samples(true)}
                            >
                                Details
                            </Button>
                            <Drawer
                                title="Samples"
                                placement="right"
                                closable={false}
                                onClose={() => setVisible_samples(false)}
                                visible={visible_samples}
                            >
                                <List_Sample />
                            </Drawer>
                        </>
                    ) : null} */}
                </Form>
                <PicturesWall />
            </>
        )
    );
};

export default Body_Details_Form;

const PicturesWall = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handlePreview = (file) => {
        setPreviewImage(file.thumbUrl);
        setPreviewVisible(true);
    };

    const handleUpload = ({ fileList }) => {
        fileList = fileList.slice(-1);
        console.log("fileList", fileList);
        setFileList(fileList);
    };

    const handleSubmit = (event) => {
        // event.preventDefault();

        let formData = new FormData();
        formData.append("image", fileList[0].originFileObj);

        axios
            .post("http://localhost:8000/api/img_feedback/", formData)
            .then((res) => {
                console.log("res", res);
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    const uploadButton = (
        <div>
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <div>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={(e) => handlePreview(e)}
                onChange={(e) => handleUpload(e)}
                beforeUpload={() => false}
            >
                {uploadButton}
            </Upload>

            <Button onClick={(e) => handleSubmit(e)}>Submit</Button>

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
        </div>
    );
};

// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

const PicturesWall = (props) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([
        {
            uid: "-1",
            name: "image.png",
            status: "done",
            url:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
    ]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
        );

        // OR //

        // setPreviewImage(file.thumbUrl);
        // setPreviewVisible(true);
    };

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handlePreview = (file) => {
        setPreviewImage(file.thumbUrl);
        setPreviewVisible(true);
    };

    return (
        <>
            <Upload
                // listType="picture-card"
                listType="picture"
                fileList={fileList}
                onPreview={(file) => handlePreview(file)}
                onChange={(fileList) => setFileList(fileList)}
                beforeUpload={() => false}
            >
                {fileList.length >= 8 ? null : (
                    <>
                        <PlusOutlined /> <span>Upload</span>
                    </>
                )}
            </Upload>

            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
            >
                <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};

// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//     });
// }

// const PicturesWall = (props) => {
//     const [previewVisible, setPreviewVisible] = useState(false);
//     const [previewImage, setPreviewImage] = useState("");
//     const [previewTitle, setPreviewTitle] = useState("");
//     const [fileList, setFileList] = useState([
//         {
//             uid: "-1",
//             name: "image.png",
//             status: "done",
//             url:
//                 "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//         },
//     ]);

//     // const handlePreview = async (file) => {
//     //     if (!file.url && !file.preview) {
//     //         file.preview = await getBase64(file.originFileObj);
//     //     }
//     //     setPreviewImage(file.url || file.preview);
//     //     setPreviewVisible(true);
//     //     setPreviewTitle(
//     //         file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
//     //     );

//     // OR //

//     // setPreviewImage(file.thumbUrl);
//     // setPreviewVisible(true);
//     //};

//     // const [previewVisible, setPreviewVisible] = useState(false);
//     // const [previewImage, setPreviewImage] = useState(false);
//     // const [fileList, setFileList] = useState([]);

//     const handlePreview = (file) => {
//         setPreviewImage(file.thumbUrl);
//         setPreviewVisible(true);
//     };

//     return (
//         <>
//             <Upload
//                 // listType="picture-card"
//                 listType="picture"
//                 fileList={fileList}
//                 onPreview={(file) => handlePreview(file)}
//                 onChange={({ fileList }) => setFileList(fileList)}
//                 beforeUpload={() => false}
//             >
//                 {fileList.length >= 8 ? null : (
//                     <>
//                         <PlusOutlined /> <span>Upload</span>
//                     </>
//                 )}
//             </Upload>

//             <Modal
//                 visible={previewVisible}
//                 title={previewTitle}
//                 footer={null}
//                 onCancel={() => setPreviewVisible(false)}
//             >
//                 <img
//                     alt="example"
//                     style={{ width: "100%" }}
//                     src={previewImage}
//                 />
//             </Modal>
//         </>
//     );
// };

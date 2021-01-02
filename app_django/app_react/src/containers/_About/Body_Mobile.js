import React, { } from "react";

import useWindowDimensions from "../../redux/misc/windowDimensions";
import { RESPONSIVE_WIDTH } from "../../redux/misc/constants";

import { MehTwoTone } from "@ant-design/icons";
import { Space } from "antd";

const Body_Mobile = (props) => {
    const { height, width } = useWindowDimensions();

    let res_tab_deck = null;
    let res_tab_group = null;
    let res_tab_note = null;

    if (width > RESPONSIVE_WIDTH) {
        res_tab_deck = "Decks";
        res_tab_group = "Groupdecks";
        res_tab_note = "Notes";
    }

    return (
        <>
            <p>Information Page About - Mobile</p>

            <Space align="center" direction="horizontal" size="large">
                <MehTwoTone style={{ fontSize: '48px' }} />
                <h3>Work in progress...</h3>
            </Space>

            <br /><br />
            <p>* StudyChan.apk is the daily reviewing companion:</p>

            <h4>TODO:</h4>

            <ul>
                <li> almost everything... work is roughly 5% done </li>
            </ul>

            {/* <br /><br />
            <p>... Users can automatically download, review, and sync subscribed content.</p>
            <br /><br /> */}
        </>
    );
};

export default Body_Mobile;

// import React, { Component } from "react";
// import axios from "../../redux/authentication/axios";

// class Body_Mobile extends Component {
//     state = {
//         title: "",
//         content: "",
//         image: null,
//     };

//     handleChange = (e) => {
//         this.setState({
//             [e.target.id]: e.target.value,
//         });
//     };

//     handleImageChange = (e) => {
//         this.setState({
//             image: e.target.files[0],
//         });
//     };

//     handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(this.state);
//         let form_data = new FormData();
//         form_data.append("image", this.state.image, this.state.image.name);
//         form_data.append("title", this.state.title);
//         form_data.append("content", this.state.content);
//         let url = "http://localhost:8000/api/img_feedback/";
//         axios
//             .post(url, form_data, {
//                 headers: {
//                     "content-type": "multipart/form-data",
//                 },
//             })
//             .then((res) => {
//                 console.log(res.data);
//             })
//             .catch((err) => console.log(err));
//     };

//     render() {
//         return (
//             <div className="App">
//                 <form onSubmit={this.handleSubmit}>
//                     <p>
//                         <input
//                             type="text"
//                             placeholder="Title"
//                             id="title"
//                             value={this.state.title}
//                             onChange={this.handleChange}
//                             required
//                         />
//                     </p>
//                     <p>
//                         <input
//                             type="text"
//                             placeholder="Content"
//                             id="content"
//                             value={this.state.content}
//                             onChange={this.handleChange}
//                             required
//                         />
//                     </p>
//                     <p>
//                         <input
//                             type="file"
//                             id="image"
//                             accept="image/png, image/jpeg"
//                             onChange={this.handleImageChange}
//                             required
//                         />
//                     </p>
//                     <input type="submit" />
//                 </form>
//             </div>
//         );
//     }
// }

// export default Body_Mobile;

// const PicturesWall = () => {
//     const [previewVisible, setPreviewVisible] = useState(false);
//     const [previewImage, setPreviewImage] = useState(false);
//     const [fileList, setFileList] = useState([]);

//     const handlePreview = (file) => {
//         setPreviewImage(file.thumbUrl);
//         setPreviewVisible(true);
//     };

//     const handleUpload = ({ fileList }) => {
//         fileList = fileList.slice(-1);
//         console.log("fileList", fileList);
//         setFileList(fileList);
//     };

//     const handleSubmit = (event) => {
//         // event.preventDefault();

//         let formData = new FormData();
//         formData.append("image", fileList[0].originFileObj);

//         axios
//             .post("http://localhost:8000/api/img_feedback/", formData)
//             .then((res) => {
//                 console.log("res", res);
//             })
//             .catch((err) => {
//                 console.log("err", err);
//             });
//     };

//     const uploadButton = (
//         <div>
//             <div className="ant-upload-text">Upload</div>
//         </div>
//     );

//     return (
//         <div>
//             <Upload
//                 listType="picture-card"
//                 fileList={fileList}
//                 onPreview={(e) => handlePreview(e)}
//                 onChange={(e) => handleUpload(e)}
//                 beforeUpload={() => false}
//             >
//                 {uploadButton}
//             </Upload>

//             <Button onClick={(e) => handleSubmit(e)}>Submit</Button>

//             <Modal
//                 visible={previewVisible}
//                 footer={null}
//                 onCancel={() => setPreviewVisible(false)}
//             >
//                 <img
//                     alt="example"
//                     style={{ width: "100%" }}
//                     src={previewImage}
//                 />
//             </Modal>
//         </div>
//     );
// };

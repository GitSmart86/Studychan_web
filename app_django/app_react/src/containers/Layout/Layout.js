import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link, withRouter, useLocation } from "react-router-dom";

import List_News from "../../components/List_News";
import Login from "./Auth_Login";
import Signup from "./Auth_Signup";
import axios from "../../redux/authentication/axios";
import * as actions from "../../redux/authentication/actions/auth";
import useWindowDimensions from "../../redux/misc/windowDimensions";
import { RESPONSIVE_WIDTH } from "../../redux/misc/constants";
import Auth_Google from "./Auth_Google";

import { BodyRouter, SiderRouter, FooterRouter } from "../../routes";
import { Layout, Menu, Row, Button, Drawer, Tabs, Modal, Affix, Col, Avatar } from "antd";
import {
    UserOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    QuestionCircleOutlined,
    FileSearchOutlined,
    UserAddOutlined,
    LoginOutlined,
    InfoCircleOutlined,
    CloseOutlined,
    FormOutlined,
} from "@ant-design/icons";
import { LOCALHOST } from "../../redux/misc/constants";
import cover_landscape from '../../media/cover_name.png'

const { Header, Content } = Layout;
const { TabPane } = Tabs;

function CustomLayout(props) {
    //  ㅡㅡㅡㅡㅡㅡㅡㅡㅡ  //
    //  Load Local Tags  //
    //  ㅡㅡㅡㅡㅡㅡㅡㅡㅡ  //

    let dispatch = useDispatch();
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/phylum_tag/").then((res) => {
            // console.log("DB_TAGS: ", res)
            dispatch(actions.setLocalDatabaseTags(res.data));
        });
    }, [dispatch]);
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/informatics_tag/").then((res) => {
            // console.log("IS_TAGS: ", res)
            dispatch(actions.setLocalStoreTags(res.data));
        });
    }, [dispatch]);

    //  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  //
    //  Update Current Page   //
    //  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  //

    let location = useLocation();
    useEffect(() => {
        dispatch(actions.updateCurrentPage(location.pathname));
    }, [location]);

    //  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  //
    //  React to Current Page   //
    //  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  //

    const [Visible_News, setVisible_News] = useState(false);
    const [visible_Login, setVisible_Login] = useState(false);

    //  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  //
    //  Responsive Design   //
    //  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ  //

    var userId = useSelector((state) => state.userId);
    const { height, width } = useWindowDimensions();

    let res_store = null;
    let res_about = null;
    let res_logout = null;
    let res_account = null;
    let res_database = null;
    let res_news = null;
    let res_news_width = "100%";

    if (width > RESPONSIVE_WIDTH) {
        res_store = "Store";
        res_logout = "Logout";
        res_account = "Account";
        res_database = "Database";
        res_about = "About";
        res_news = "News";
        res_news_width = 650;
    }

    return (
        <Layout className="layout">
            <Affix offsetTop={0}>
                <Header>
                    <Row align="center">
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["1"]}
                            style={{ position: "absolute", left: 10 }}
                        >
                            <Menu.Item key="10">
                                <Link to="/about">
                                    <QuestionCircleOutlined />
                                    {res_about}
                                </Link>
                            </Menu.Item>

                            <Menu.Item
                                key="17"
                                onClick={() => setVisible_News(true)}
                            >
                                <InfoCircleOutlined rotate={180} />
                                {res_news}
                            </Menu.Item>

                            <Menu.Item key="16">
                                <Link to="/database">
                                    <FileSearchOutlined />
                                    {res_database}
                                </Link>
                            </Menu.Item>
                        </Menu>

                        <img src={cover_landscape} style={{ height: "65px" }} />

                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["2"]}
                            style={{ position: "absolute", right: 10 }}
                        >
                            {props.isAuthenticated ? (
                                <Menu.Item key="2">
                                    <Link to={`/account/${userId}`}>
                                        <UserOutlined />
                                        {res_account}
                                    </Link>
                                </Menu.Item>
                            ) : null}
                            {props.isAuthenticated ? (
                                <Menu.Item
                                    danger
                                    key="1"
                                    onClick={props.logout}
                                >
                                    <LogoutOutlined />
                                    {res_logout}
                                </Menu.Item>
                            ) : (
                                    <>
                                        <Button
                                            type="primary"
                                            onClick={() => setVisible_Login(true)}
                                        >
                                            <LoginOutlined />
                                        Login
                                    </Button>

                                        <Modal
                                            // title="Basic Modal"
                                            visible={visible_Login}
                                            footer={null}
                                            // onOk={() => setVisible_Login(false)}
                                            onCancel={() => setVisible_Login(false)}
                                        >
                                            <Tabs tabPosition="top">
                                                <TabPane
                                                    tab={
                                                        <span>
                                                            <UserAddOutlined />
                                                        OAuth
                                                    </span>
                                                    }
                                                    key="1"
                                                >
                                                    <Auth_Google />
                                                </TabPane>

                                                <TabPane
                                                    tab={
                                                        <span>
                                                            <UserAddOutlined />
                                                        Login
                                                    </span>
                                                    }
                                                    key="2"
                                                >
                                                    <Login />
                                                </TabPane>

                                                <TabPane
                                                    tab={
                                                        <span>
                                                            <FormOutlined />
                                                        Signup
                                                    </span>
                                                    }
                                                    key="3"
                                                >
                                                    <Signup />
                                                </TabPane>
                                            </Tabs>
                                        </Modal>
                                    </>
                                )}
                            <Menu.Item key="3">
                                <Link to={"/store"} style={{ color: "cyan" }}>
                                    <ShoppingOutlined />
                                    {res_store}
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Row>
                </Header>
            </Affix>

            <Drawer
                width={res_news_width}
                title={
                    <Row justify="space-around">
                        <span> Studychan News: </span>
                        <Button onClick={() => setVisible_News(false)}>
                            <CloseOutlined />
                        </Button>
                    </Row>
                }
                placement={"right"}
                closable={false}
                onClose={() => setVisible_News(false)}
                visible={Visible_News}
            >
                <List_News />
            </Drawer>

            <Content>
                <Layout>
                    <Affix offsetTop={65}>
                        <SiderRouter />
                    </Affix>

                    <Content style={{ padding: "0 10px" }}>
                        <div
                            className="site-layout-content"
                            style={{
                                background: "#fff",
                                padding: 0,
                                border: "solid 1px black",
                                minHeight: 500,
                            }}
                        >
                            <Row justify="center">
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 22 }} lg={{ span: 16 }}>
                                    <BodyRouter />
                                </Col>
                            </Row>
                        </div>
                    </Content>
                </Layout>
            </Content>

            <FooterRouter />
        </Layout>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout()),
    };
};

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));

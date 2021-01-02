import { connect } from "react-redux";
import React, { Component } from "react";
import { Router } from "react-router-dom"; // BrowserRouter
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import CustomLayout from "./containers/Layout/Layout";
import * as actions from "./redux/authentication/actions/auth";

import { createBrowserHistory } from "history";
export const appHistory = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    this.props.loadStore();
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div className="App">
        <Router history={appHistory}>  {/* <BrowserRouter */}
          <CustomLayout {...this.props}>
            {/* <BaseRouter /> */}
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    loadStore: () => dispatch(actions.loadStoreFromLocalstorage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

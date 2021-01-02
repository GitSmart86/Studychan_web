import React from "react";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import * as actions from "../../redux/authentication/actions/auth";

const Auth_Google = (props) => {
    const onFailure = (response) => {
        console.log(response);
    };

    const onSuccess = (response) => {
        props.handleOAuth(response);
    };

    return (
        <div>
            <GoogleLogin
                clientId="422115477782-rebgr9q680oq226tkgkpo11ip5elmdg2.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
            />
        </div>
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
        handleOAuth: (response) => dispatch(actions.oAuthLogin(response)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth_Google);

//  npm install react-google-login

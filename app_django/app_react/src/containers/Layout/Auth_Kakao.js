import React from "react";
import * as actions from "../authentication/actions/auth";
import { connect } from "react-redux";

const Auth_Google = (props) => {
    const onFailure = (response) => {
        console.log("KAKAO_RESPONSE:", response);
        console.log("KAKAO_RESPONSE:", response.profileObj);
    };

    const onSuccess = (response) => {
        console.log("KAKAO_RESPONSE:", response);
        console.log("KAKAO_RESPONSE:", response.profileObj);

        props.handleOAuth(response);
    };

    return (
        <div>
            <KakaoLogin
                jsKey={key}
                onSuccess={onSuccess}
                onFailure={onFailure}
                render={(props) => (
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onClick();
                        }}
                    >
                        Login with Kakao
                    </a>
                )}
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

//  npm install react-kakao-login

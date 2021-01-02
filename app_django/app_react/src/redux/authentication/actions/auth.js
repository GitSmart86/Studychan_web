// import axios from "axios";
import axios from "../axios";
import * as actionTypes from "./actionTypes";

export const updateActiveUserData = (userData) => {
    return { ...userData, type: actionTypes.UPDATE_ACTIVE_USERDATA };
};

export const refreshLayout = () => {
    return {
        type: actionTypes.REFRESH_LAYOUT,
    };
};

export const loadStoreFromLocalstorage = () => {
    return {
        type: actionTypes.LOAD_STORE_FROM_LOCALSTORAGE,
    };
};

export const setLocalDatabaseTags = (data) => {
    return {
        type: actionTypes.SET_LOCAL_DB_TAGS,
        data: data,
    };
};

export const setLocalStoreTags = (data) => {
    return {
        type: actionTypes.SET_LOCAL_STORE_TAGS,
        data: data,
    };
};

export const setStoreQueryResults = (data) => {
    return {
        type: actionTypes.SET_STORE_QUERY_RESULTS,
        data: data,
    };
};

export const setDBQueryResults = (data) => {
    return {
        type: actionTypes.SET_DB_QUERY_RESULTS,
        data: data,
    };
};

export const updateCurrentPage = (page) => {
    return {
        type: actionTypes.UPDATE_CURRENT_PAGE,
        page: page,
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            // dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
};

export const authLogin = (username, password) => {
    return (dispatch) => {
        dispatch(authStart());
        axios
            .post("rest-auth/login/", {
                username: username,
                password: password,
            })
            .then((res) => {
                handleToken(res.data.key, dispatch);
            })
            .catch((err) => {
                dispatch(authFail(err));
            });
    };
};

export const authSignup = (username, email, password1, password2) => {
    return (dispatch) => {
        dispatch(authStart());
        axios
            .post("rest-auth/registration/", {
                username: username,
                email: email,
                password1: password1,
                password2: password2,
            })
            .then((res) => {
                console.log("success");
                handleToken(res.data.key, dispatch);
            })
            .catch((err) => {
                dispatch(authFail(err));
            });
    };
};

export const oAuthLogin = (response) => {
    return (dispatch) => {
        dispatch(authStart());
        const data = {
            access_token: response.accessToken,
            code: "",
        };

        axios
            .post("rest-auth/google/", data)
            .then((res) => {
                if (res.status === 200) {
                    handleToken(res.data.key, dispatch);
                }
            })
            .catch((error) => console.error(error));
    };
};

function handleToken(token, dispatch) {
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationDate", expirationDate);
    dispatch(authSuccess(token));
    dispatch(checkAuthTimeout(3600));
    fetchUserData(dispatch);
}

function fetchUserData(dispatch) {
    if (localStorage.getItem("token")) {
        // const context = {
        //     headers: {
        //         authorization: `Token ${localStorage.getItem("token")}`,
        //         "Content-Type": "application/json",
        //         accept: "application/json",
        //     },
        //     params: {
        //         token: localStorage.getItem("token"),
        //     },
        // };
        axios
            .get("api/obtainauthuserdata/")
            .then((res) => {
                const userData = {
                    userId: res.data.id,
                    userName: res.data.name,
                    userEmail: res.data.email,
                };
                dispatch(updateActiveUserData(userData));
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        console.log(
            "ERROR: no userToken found in localStorage for fetchUserData()."
        );
    }
}

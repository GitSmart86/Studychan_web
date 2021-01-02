import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    token: null,
    error: null,
    loading: false,
    userId: 0,
    userName: null,
    userEmail: null,
    currentPage: "test",
    storeQueryResults: null,
    databaseQueryResults: null,
    localDBTags: null,
    localStoreTags: null,
    refresh: false,
};

const refreshLayout = (state, action) => {
    const pi = Math.random();
    let data = {
        refresh: pi,
    };
    return updateObject(state, data);
};

const setStoreQueryResults = (state, action) => {
    let data = {
        storeQueryResults: action.data,
    };
    return updateObject(state, data);
};

const setDBQueryResults = (state, action) => {
    let data = {
        databaseQueryResults: action.data,
    };
    return updateObject(state, data);
};

const setLocalStoreTags = (state, action) => {
    let data = {
        localStoreTags: action.data,
    };
    return updateObject(state, data);
};

const setLocalDatabaseTags = (state, action) => {
    let data = {
        localDBTags: action.data,
    };
    return updateObject(state, data);
};

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

const authLogout = (state, action) => {
    localStorage.setItem("userId", null);
    localStorage.setItem("userEmail", null);
    localStorage.setItem("userName", null);

    return updateObject(state, {
        token: null,
        userId: null,
        userName: null,
        userEmail: null,
    });
};

const updateActiveUserData = (state, action) => {
    localStorage.setItem("userId", action.userId);
    localStorage.setItem("userEmail", action.userEmail);
    localStorage.setItem("userName", action.userName);

    return updateObject(state, {
        userId: action.userId,
        userEmail: action.userEmail,
        userName: action.userName,
    });
};

const loadStoreFromLocalstorage = (state, action) => {
    return updateObject(state, {
        userId: localStorage.getItem("userId"),
        userEmail: localStorage.getItem("userEmail"),
        userName: localStorage.getItem("userName"),
    });
};

const updateCurrentPage = (state, action) => {
    return updateObject(state, {
        currentPage: action.page,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);

        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);

        case actionTypes.AUTH_FAIL:
            return authFail(state, action);

        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);

        case actionTypes.UPDATE_ACTIVE_USERDATA:
            return updateActiveUserData(state, action);

        case actionTypes.LOAD_STORE_FROM_LOCALSTORAGE:
            return loadStoreFromLocalstorage(state, action);

        case actionTypes.UPDATE_CURRENT_PAGE:
            return updateCurrentPage(state, action);

        case actionTypes.SET_STORE_QUERY_RESULTS:
            return setStoreQueryResults(state, action);

        case actionTypes.SET_DB_QUERY_RESULTS:
            return setDBQueryResults(state, action);

        case actionTypes.SET_LOCAL_DB_TAGS:
            return setLocalDatabaseTags(state, action);

        case actionTypes.SET_LOCAL_STORE_TAGS:
            return setLocalStoreTags(state, action);

        case actionTypes.REFRESH_LAYOUT:
            return refreshLayout(state, action);

        default:
            return state;
    }
};

export default reducer;

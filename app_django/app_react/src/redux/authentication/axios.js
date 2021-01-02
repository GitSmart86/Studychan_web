const axios_instance = require("axios");

const axios = axios_instance.create({
    baseURL: "http://127.0.0.1:8000/",
    // baseURL: "localhost:8000/",
    headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "http://127.0.0.1:8000/",
        // "Access-Control-Allow-Origin": "http://127.0.0.1:3000/",
        //, multipart/form-data", //, image/jpeg",
        Accept: "application/json, multipart/form-data",
    },
});

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Token ${token}` : "";
    return config;
});

// axios.interceptors.request.use(req => {
//   console.log(`${req.method} ${req.url}`);
//   // Important: request interceptors **must** return the request.
//   return req;
// });

// axios.interceptors.response.use(res => {
//   console.log(res.data.json);
//   // Important: response interceptors **must** return the response.
//   return res;
// });

// import axios from "axios";

// const instance = axios.create({
//     baseURL: "http://127.0.0.1:8000/",
// });

// export const setAuthToken = (token) => {
//     if (token) {
//         // Apply to every request
//         instance.defaults.headers.common[
//             "Authorization"
//         ] = `Token ${localStorage.getItem("token")}`;
//     } else {
//         // Delete auth header
//         delete instance.defaults.headers.common["Authorization"];
//     }
//     // console.log("TAG ADDED");
//     // instance.defaults.headers.common[
//     //     "Authorization"
//     // ] = `Token ${localStorage.getItem("token")}`;

//     // response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=None")
// };

// export default instance;

// import axios from "axios";

// const ax = () => {
//     const defaultOptions = {
//         baseURL: "http://127.0.0.1:8000/",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     };

//     // Create instance
//     let instance = axios.create(defaultOptions);

//     // Set the AUTH token for any request
//     instance.interceptors.request.use(function (config) {
//         const token = localStorage.getItem("token");
//         config.headers.Authorization = token ? `Token ${token}` : "";
//         return config;
//     });

//     return instance;
// };

export default axios;

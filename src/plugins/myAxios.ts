import axios from "axios";

// Set config defaults when creating the instance
const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api',
});

myAxios.defaults.withCredentials = true; // allow cookie


myAxios.interceptors.request.use(function (config) {
    console.log("Going to send,",config)
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Response
myAxios.interceptors.response.use(function (response) {
    console.log("Recv,",response)
    // not login
    if (response?.data?.code === 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `user/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});


export default myAxios;
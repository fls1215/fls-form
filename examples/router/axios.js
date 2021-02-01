import axios from "axios";


axios.defaults.timeout = 30000;
axios.interceptors.request.use((config) =>{
    return config;
},error => Promise.reject(error));

axios.interceptors.request.use(async(data) => {
    let resultData = data;
    return resultData;
},(error) => {
    if (error && error.response) {
        const { status } = error.response;

        if (status) {
           console.log(status);
        }
    }
    return Promise.reject(new Error(error));
})
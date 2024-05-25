import axios from 'axios';

const dommusApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})
dommusApi.interceptors.request.use((config) => {
    const newConfig = {...config};
    const token = sessionStorage.getItem('token');
    if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
});


export default dommusApi;
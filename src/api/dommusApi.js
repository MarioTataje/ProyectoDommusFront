import axios from 'axios';

const dommusApi = axios.create({
    baseURL: 'https://dommus-a2hyfzbwbng7hcev.brazilsouth-01.azurewebsites.net/api/'
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
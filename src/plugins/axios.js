import axios from 'axios';


export const api_url = 'http://127.0.0.1:8000/'; // 'https://backend-ecommerce-gobierno.onrender.com/' - 'http://127.0.0.1:8000/'

export const axiosIns = axios.create({
    baseURL: api_url,
});


axiosIns.interceptors.request.use(config => {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];

    if (token) {
        config.headers.Authorization = `Bearer ${decodeURIComponent(token)}`;
    }

    return config;
});

import axios from 'axios';


export const api_url = 'https://backend-ecommerce-gobierno.onrender.com/'; // 'https://backend-ecommerce-gobierno.onrender.com/' - 'http://127.0.0.1:8000/'

export const axiosIns = axios.create({
    baseURL: api_url,
});

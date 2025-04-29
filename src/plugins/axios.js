
import { environment } from  '@/environments/environment';
import axios from 'axios';

export const api_url =  environment.apiUrl;

export const axiosIns = axios.create({
    baseURL: api_url,
});

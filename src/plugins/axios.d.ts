// @/plugins/axios.d.ts
import { AxiosInstance } from 'axios';

declare module '@/plugins/axios' {
    const axiosIns: AxiosInstance;
    const api_url: string;
    export { axiosIns, api_url };
}

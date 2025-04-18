import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    estado: "app/estado/",
};

@Injectable({
    providedIn: 'root',
})
export class EstadoService {
    async getEstado() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.estado}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los estados:', error);
            throw error;
        }
    }
}

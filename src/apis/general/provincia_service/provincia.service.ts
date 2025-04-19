import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    provincias: "app/provincia/",
    crearProvincia: "app/provincia/crear/",
    actualizarProvincia: (id: number) => `app/provincia/actualizar/${id}/`,
    eliminarProvincia: (id: number) => `app/provincia/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class ProvinciaService {
    async getProvincias() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.provincias}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener las Provincias:', error);
            throw error;
        }
    }

    async createProvincia(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearProvincia}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear la Provincia:', error);
            throw error;
        }
    }
    async updateProvincia(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarProvincia(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar la Provincia:', error);
            throw error;
        }
    }

    async deleteProvincia(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarProvincia(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar la Provincia:', error);
            throw error;
        }
    }
}

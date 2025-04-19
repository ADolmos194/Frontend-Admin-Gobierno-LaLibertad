import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    distritos: "app/distrito/",
    crearDistrito: "app/distrito/crear/",
    actualizarDistrito: (id: number) => `app/distrito/actualizar/${id}/`,
    eliminarDistrito: (id: number) => `app/distrito/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class DistritoService {
    async getDistritos() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.distritos}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los Distritos:', error);
            throw error;
        }
    }

    async createDistrito(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearDistrito}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear el Distrito:', error);
            throw error;
        }
    }
    async updateDistrito(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarDistrito(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el Distrito:', error);
            throw error;
        }
    }

    async deleteDistrito(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarDistrito(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el Distrito:', error);
            throw error;
        }
    }
}

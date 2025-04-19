import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    pais: "app/paises/",
    paisesactivos: "app/paisesactivos/",


    crearPais: "app/pais/crear/",
    actualizarPais: (id: number) => `app/pais/actualizar/${id}/`,
    eliminarPais: (id: number) => `app/pais/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class PaisService {
    async getPaises() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.pais}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los paises:', error);
            throw error;
        }
    }

    async getPaisesActivos() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.paisesactivos}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los paises activos:', error);
            throw error;
        }
    }

    async createPais(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearPais}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear el Pais:', error);
            throw error;
        }
    }
    async updatePais(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarPais(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el Pais:', error);
            throw error;
        }
    }

    async deletePais(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarPais(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el Pais:', error);
            throw error;
        }
    }
}

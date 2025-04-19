import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    mercado: "app/mercado/",
    crearMercado: "app/mercado/crear/",
    actualizarMercado: (id: number) => `app/mercado/actualizar/${id}/`,
    eliminarMercado: (id: number) => `app/mercado/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class MercadoService {
    async getMercados() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.mercado}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los Mercados:', error);
            throw error;
        }
    }

    async createMercado(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearMercado}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear el Mercado:', error);
            throw error;
        }
    }
    async updateMercado(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarMercado(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el Mercado:', error);
            throw error;
        }
    }

    async deleteMercado(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarMercado(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el Mercado:', error);
            throw error;
        }
    }
}

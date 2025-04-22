import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    unidadesmedidas: "app/unidadmedida/",
    crearUnidadmedida: "app/unidadmedida/crear/",
    actualizarUnidadmedida: (id: number) => `app/unidadmedida/actualizar/${id}/`,
    eliminarUnidadmedida: (id: number) => `app/unidadmedida/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class UnidadMedidaService {
    async getUnidadesMedidas() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.unidadesmedidas}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener las Unidades de Medidas:', error);
            throw error;
        }
    }

    async createUnidadMedida(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearUnidadmedida}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear la Unidad de Medida:', error);
            throw error;
        }
    }
    async updateUnidadMedida(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarUnidadmedida(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar la Unidad de Medida:', error);
            throw error;
        }
    }

    async deleteUnidadMedida(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarUnidadmedida(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar la Unidad de Medida:', error);
            throw error;
        }
    }
}

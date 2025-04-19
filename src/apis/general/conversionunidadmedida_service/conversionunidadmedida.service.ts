import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    conversionesunidadesmedidas: "app/conversionunidadmedida/",
    crearConversionUnidadmedida: "app/conversionunidadmedida/crear/",
    actualizarConversionUnidadmedida: (id: number) => `app/conversionunidadmedida/actualizar/${id}/`,
    eliminarConversionUnidadmedida: (id: number) => `app/conversionunidadmedida/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class ConversionUnidadMedidaService {
    async getConversionesUnidadesMedidas() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.conversionesunidadesmedidas}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener las Conversiones de Unidades de Medidas:', error);
            throw error;
        }
    }

    async createConversionUnidadMedida(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearConversionUnidadmedida}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear la Conversion de Unidad de Medida:', error);
            throw error;
        }
    }
    async updateConversionUnidadMedida(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarConversionUnidadmedida(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar la Conversion de Unidad de Medida:', error);
            throw error;
        }
    }

    async deleteConversionUnidadMedida(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarConversionUnidadmedida(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar la Conversion de Unidad de Medida:', error);
            throw error;
        }
    }
}

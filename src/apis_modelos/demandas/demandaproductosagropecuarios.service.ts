import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    demandaproductosagropecuarios: "demandas/demandaproductosagropecuarios/",
    crearDemandaProductosAgropecuarios: "demandas/demandaproductosagropecuarios/crear/",
    actualizarDemandaProductosAgropecuarios: (id: number) => `demandas/demandaproductosagropecuarios/actualizar/${id}/`,
    eliminarDemandaProductosAgropecuarios: (id: number) => `demandas/demandaproductosagropecuarios/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class DemandaProductosAgropecuariosService {
    async getDemandaProductosAgropecuarios() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.demandaproductosagropecuarios}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener las demandas productos agropecuarios:', error);
            throw error;
        }
    }

    async createDemandaProductosAgropecuarios(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearDemandaProductosAgropecuarios}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear la Demanda productos agropecuarios:', error);
            throw error;
        }
    }
    async updateDemandaProductosAgropecuarios(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarDemandaProductosAgropecuarios(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar la Demanda productos agropecuarios:', error);
            throw error;
        }
    }

    async deleteDemandaProductosAgropecuarios(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarDemandaProductosAgropecuarios(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar la Demanda productos agropecuarios:', error);
            throw error;
        }
    }
}

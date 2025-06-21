import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {

    tiposdemandas: "appdemandas/tiposdemandas/",
    // Define the endpoints for the demandas API
    demandas: (id: number) => `appdemandas/demandas/${id}/`,
    crearDemandas: "appdemandas/demandas/crear/",
    actualizarDemandas: (id: number) => `appdemandas/demandas/actualizar/${id}/`,
    eliminarDemandas: (id: number) => `appdemandas/demandas/eliminar/${id}/`,
    eliminarDemandasMasiva: "appdemandas/demandas/eliminacion-masiva/",
};

@Injectable({
    providedIn: 'root',
})
export class DemandasService {

    async getTiposDemandas() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.tiposdemandas}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los tipos de demandas', error);
            throw error;
        }
    }
    async getDemandas(id:number) {
        try {
            const response = await axiosIns.get(`${url}${endpoints.demandas(id)}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener las demandas', error);
            throw error;
        }
    }

    async createDemandas(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearDemandas}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear la demanda', error);
            throw error;
        }
    }
    async updateDemandas(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarDemandas(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar la demanda', error);
            throw error;
        }
    }

    async deleteDemandas(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarDemandas(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar la demanda', error);
            throw error;
        }
    }
    async eliminarMultiplesDemandas(ids: number[]) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.eliminarDemandasMasiva}`, { ids });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar múltiples demandas', error);
            throw error;
        }
    }
}



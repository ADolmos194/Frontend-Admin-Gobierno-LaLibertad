import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    localidadescaseriosactivos: "app/localidadcaserioactivos/",
    localidadescaserios: "app/localidadcaserio/",
    crearLocalidadCaserio: "app/localidadcaserio/crear/",
    actualizarLocalidadCaserio: (id: number) => `app/localidadcaserio/actualizar/${id}/`,
    eliminarLocalidadCaserio: (id: number) => `app/localidadcaserio/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class LocalidadCaserioService {

    async getLocalidadesCaseriosActivos() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.localidadescaseriosactivos}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener las Localidades - Caserios activos:', error);
            throw error;
        }
    }

    async getLocalidadesCaserios() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.localidadescaserios}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener las Localidades - Caserios:', error);
            throw error;
        }
    }

    async createLocalidadCaserio(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearLocalidadCaserio}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear la Localidad - el Caserio:', error);
            throw error;
        }
    }
    async updateLocalidadCaserio(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarLocalidadCaserio(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar la Localidad - el Caserio', error);
            throw error;
        }
    }

    async deleteLocalidadCaserio(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarLocalidadCaserio(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar la Localidad - el Caserio:', error);
            throw error;
        }
    }
}

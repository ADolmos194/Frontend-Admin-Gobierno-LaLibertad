import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    preciosciudades: "registros/preciosciudades/",
    crearPreciosCiudades: "registros/preciosciudades/crear/",
    actualizarPreciosCiudades: (id: number) => `registros/preciosciudades/actualizar/${id}/`,
    eliminarPreciosCiudades: (id: number) => `registros/preciosciudades/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class PreciosCiudadesService {
    async getPreciosCiudades() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.preciosciudades}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los Precios Ciudades::', error);
            throw error;
        }
    }

    async createPreciosCiudades(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearPreciosCiudades}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear el precio ciudad:', error);
            throw error;
        }
    }
    async updatePreciosCiudades(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarPreciosCiudades(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el precios ciudad:', error);
            throw error;
        }
    }

    async deletePreciosCiudades(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarPreciosCiudades(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el precios ciudad:', error);
            throw error;
        }
    }
}

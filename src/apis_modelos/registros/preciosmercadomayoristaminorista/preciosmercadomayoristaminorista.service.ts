import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    preciosmercadomayoristaminorita: "registros/preciosmercadomayoristaminorita/",
    crearPreciosMercadoMayoristaMinorita: "registros/preciosmercadomayoristaminorita/crear/",
    actualizarPreciosMercadoMayoristaMinorita: (id: number) => `registros/preciosmercadomayoristaminorita/actualizar/${id}/`,
    eliminarPreciosMercadoMayoristaMinorita: (id: number) => `registros/preciosmercadomayoristaminorita/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class PreciosMercadoMayoristaMinoritaService {
    async getPreciosMercadoMayoristaMinorita() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.preciosmercadomayoristaminorita}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los precios mercado mayorista minorita:', error);
            throw error;
        }
    }

    async createPreciosMercadoMayoristaMinorita(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearPreciosMercadoMayoristaMinorita}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear el Precio Mercado Mayorista Minorita', error);
            throw error;
        }
    }
    async updatePreciosMercadoMayoristaMinorita(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarPreciosMercadoMayoristaMinorita(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el Precio Mercado Mayorista Minorita', error);
            throw error;
        }
    }

    async deletePreciosMercadoMayoristaMinorita(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarPreciosMercadoMayoristaMinorita(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el Precio Mercado Mayorista Minorita', error);
            throw error;
        }
    }
}

import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    tiposproductos: "categorias/tipoproducto/",
    tiposproductosactivos: "categorias/tiposproductosactivos/",
    crearTipoProducto: "categorias/tipoproducto/crear/",
    actualizarTipoProducto: (id: number) => `categorias/tipoproducto/actualizar/${id}/`,
    eliminarTipoProducto: (id: number) => `categorias/tipoproducto/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class TipoProductoService {
    async getTipoProducto() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.tiposproductos}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los Tipos de productos:', error);
            throw error;
        }
    }

    async getTipoProductoActivos() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.tiposproductosactivos}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los Tipos de productos activos:', error);
            throw error;
        }
    }

    async createTipoProducto(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearTipoProducto}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear el Tipo de Producto:', error);
            throw error;
        }
    }
    async updateTipoProducto(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarTipoProducto(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el Tipo de Producto:', error);
            throw error;
        }
    }

    async deleteTipoProducto(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarTipoProducto(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el Tipo de Producto:', error);
            throw error;
        }
    }
}

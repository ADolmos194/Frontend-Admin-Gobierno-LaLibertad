import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    productos: "categorias/producto/",
    productosActivos: "categorias/productosactivos/",
    crearProducto: "categorias/producto/crear/",
    actualizarProducto: (id: number) => `categorias/producto/actualizar/${id}/`,
    eliminarProducto: (id: number) => `categorias/producto/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class ProductoService {
    async getProductos() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.productos}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            throw error;
        }
    }

    async getProductosActivos() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.productosActivos}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los productos activos:', error);
            throw error;
        }
    }


    async createProducto(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearProducto}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear el Producto:', error);
            throw error;
        }
    }
    async updateProducto(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarProducto(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el Producto:', error);
            throw error;
        }
    }

    async deleteProducto(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarProducto(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el Producto:', error);
            throw error;
        }
    }
}

import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    departamentos: "app/departamento/",
    departamentosactivos: "app/departamentosactivos/",
    crearDepartamento: "app/departamento/crear/",
    actualizarDepartamento: (id: number) => `app/departamento/actualizar/${id}/`,
    eliminarDepartamento: (id: number) => `app/departamento/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class DepartamentoService {
    async getDepartamentos() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.departamentos}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los Departamentos:', error);
            throw error;
        }
    }

    async getDepartamentosActivos() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.departamentosactivos}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los Departamentos activos:', error);
            throw error;
        }
    }

    async createDepartamento(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearDepartamento}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear el Departamento:', error);
            throw error;
        }
    }
    async updateDepartamento(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarDepartamento(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el Departamento:', error);
            throw error;
        }
    }

    async deleteDepartamento(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarDepartamento(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el Departamento:', error);
            throw error;
        }
    }
}

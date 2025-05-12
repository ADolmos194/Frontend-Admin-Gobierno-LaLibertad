import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';
import { BehaviorSubject } from 'rxjs';


export const url = api_url;
export const endpoints = {
    usuariosistemas: "autenticacion/usuariosistema/",
    verificacionusuariosistema: "autenticacion/verificacionusuariosistema/",
    crearUsuarioSistema: "autenticacion/usuariosistema/crear/",
    actualizarUsuarioSistema: (id: number) => `autenticacion/usuariosistema/actualizar/${id}/`,
    eliminarUsuarioSistema: (id: number) => `autenticacion/usuariosistema/eliminar/${id}/`,
};

@Injectable({
    providedIn: 'root',
})
export class UsuarioSistemaService {

    async verificarUsuarioSistema(data: any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.verificacionusuariosistema}`, data);

            
            localStorage.setItem('usuarioSistemaId', response.data.data.id);

            return response.data;
        } catch (error) {
            console.error('Error al verificar el Usuario del Sistema:', error);
            throw error;
        }
    }

    private usuarioSubject = new BehaviorSubject<string | null>(localStorage.getItem('usuario'));

    usuario$ = this.usuarioSubject.asObservable();

    setUsuario(usuario: string) {
    localStorage.setItem('usuario', usuario);
    this.usuarioSubject.next(usuario);
}


    clearUsuario() {
        localStorage.removeItem('usuario');
        this.usuarioSubject.next(null);
    }



    async getUsuarioSistema() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.usuariosistemas}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener los Usuarios del Sistema:', error);
            throw error;
        }
    }

    async createUsuarioSistema(data : any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearUsuarioSistema}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear el Usuario del Sistema:', error);
            throw error;
        }
    }
    async updateUsuarioSistema(id:number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarUsuarioSistema(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el Usuario del Sistema:', error);
            throw error;
        }
    }

    async deleteUsuarioSistema(id:number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarUsuarioSistema(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el Usuario del Sistema:', error);
            throw error;
        }
    }
}

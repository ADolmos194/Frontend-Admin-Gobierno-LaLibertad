import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';
import { BehaviorSubject } from 'rxjs';
import { UsuariosSistemaLogin, UsuarioSistemaLoginResponse } from './autenticacionlogin.model';

export const url = api_url;
export const endpoints = {
    usuariosistemas: "autenticacion/usuariosistema/",
    verificacionusuariosistema: "autenticacion/verificacionusuariosistema/",
    crearUsuarioSistema: "autenticacion/usuariosistema/crear/",
    actualizarUsuarioSistema: (id: number) => `autenticacion/usuariosistema/actualizar/${id}/`,
    eliminarUsuarioSistema: (id: number) => `autenticacion/usuariosistema/eliminar/${id}/`,
};

// ✅ Interceptor para agregar el token a cada petición
axiosIns.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

@Injectable({
    providedIn: 'root',
})
export class UsuarioSistemaService {

    async verificarUsuarioSistema(data: UsuariosSistemaLogin): Promise<{ status: string, message_user: string, data: UsuarioSistemaLoginResponse }> {
        try {
            const response = await axiosIns.post(`${url}${endpoints.verificacionusuariosistema}`, data);

            const { access, refresh, id, usuario } = response.data.data;

            localStorage.setItem('usuarioSistemaId', id.toString());
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

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

    async createUsuarioSistema(data: any) {
        try {
            const response = await axiosIns.post(`${url}${endpoints.crearUsuarioSistema}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear el Usuario del Sistema:', error);
            throw error;
        }
    }

    async updateUsuarioSistema(id: number, data: any) {
        try {
            const response = await axiosIns.put(`${url}${endpoints.actualizarUsuarioSistema(id)}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el Usuario del Sistema:', error);
            throw error;
        }
    }

    async deleteUsuarioSistema(id: number) {
        try {
            const response = await axiosIns.delete(`${url}${endpoints.eliminarUsuarioSistema(id)}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el Usuario del Sistema:', error);
            throw error;
        }
    }
}

import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';
import { BehaviorSubject } from 'rxjs';
import { UsuariosSistemaLogin, UsuarioSistemaLoginResponse } from './autenticacionlogin.model';
import { CookieService } from 'ngx-cookie-service';

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
    private usuarioSubject = new BehaviorSubject<string | null>(null);
    usuario$ = this.usuarioSubject?.asObservable();

    constructor(private cookie: CookieService) {
        const rawUsuarioSistema = this.cookie.get('userData');
        if (rawUsuarioSistema) {
            try {
                const user = JSON.parse(decodeURIComponent(rawUsuarioSistema));
                if (user?.email) {
                    this.setUsuario(user.email);
                } else {
                    this.clearUsuario();
                }
            } catch (e) {
                console.error('Error al parsear usuarioSistema', e);
                this.clearUsuario();
            }
        } else {
            this.clearUsuario();
        }
    }


    async verificarUsuarioSistema(data: UsuariosSistemaLogin): Promise<{ status: string, message_user: string, data: UsuarioSistemaLoginResponse }> {
        try {
            const response = await axiosIns.post(`${url}${endpoints.verificacionusuariosistema}`, data);
            const dataResponse = response.data.data;
            const access = dataResponse.access;
            const refresh = dataResponse.refresh;
            const userData = dataResponse.userData;

            if (access && refresh && userData.email) {
                this.cookie.set('access_token', access, 1, '/');
                this.cookie.set('refresh_token', refresh, 1, '/');
                this.cookie.set('userData', encodeURIComponent(JSON.stringify(userData)), 1, '/');
                this.setUsuario(userData.email);
            } else {
                console.error("Datos incompletos en la respuesta:", dataResponse);
                throw new Error("La respuesta del servidor no contiene los datos necesarios.");
            }

            return response.data;
        } catch (error) {
            console.error('Error al verificar el Usuario del Sistema:', error);
            throw error;
        }
    }

    setUsuario(email: string) {
        this.usuarioSubject.next(email);
    }

    clearUsuario() {
        this.cookie.delete('access_token');
        this.cookie.delete('refresh_token');
        this.cookie.delete('usuarioSistemaId');
        this.cookie.delete('usuario');
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

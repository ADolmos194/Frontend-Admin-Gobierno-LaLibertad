import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';
import { BehaviorSubject } from 'rxjs';
import { UsuariosSistemaLogin } from './autenticacionlogin.model';
import { CookieService } from 'ngx-cookie-service';

const url = api_url;
const endpoints = {
    usuarios: "autenticacion/usuariosistema/",
    verificar: "autenticacion/verificacionusuariosistema/",
    crear: "autenticacion/usuariosistema/crear/",
    actualizar: (id: number) => `autenticacion/usuariosistema/actualizar/${id}/`,
    eliminar: (id: number) => `autenticacion/usuariosistema/eliminar/${id}/`,
};

@Injectable({ providedIn: 'root' })
export class UsuarioSistemaService {
    private usuarioSubject = new BehaviorSubject<string | null>(null);
    usuario$ = this.usuarioSubject.asObservable();

    constructor(private cookie: CookieService) {
        const data = this.cookie.get('userData');
        try {
            const user = JSON.parse(decodeURIComponent(data));
            this.setUsuario(user?.email || null);
        } catch {
            this.clearUsuario();
        }
    }

    async verificarUsuarioSistema(data: UsuariosSistemaLogin) {
        const res = await axiosIns.post(`${url}${endpoints.verificar}`, data);
        const { access, refresh, userData, menu } = res.data.data || {};

        if (access && refresh && userData?.email && menu) {
            // 🧹 Limpia antes para asegurar token limpio
            this.clearUsuario();
            this.cookie.set('access_token', access, 1, '/');
            this.cookie.set('refresh_token', refresh, 1, '/');
            this.cookie.set('userData', encodeURIComponent(JSON.stringify(userData)), 1, '/');
            this.setUsuario(userData.email);
            return res.data;
        }
        throw new Error('Respuesta inválida del servidor.');
    }

    guardarMenu(menu: any) {
        this.cookie.set('userMenu', encodeURIComponent(JSON.stringify(menu)), 1, '/');
    }


    setUsuario(email: string | null) {
        this.usuarioSubject.next(email);
    }

    clearUsuario() {
        ['access_token', 'refresh_token', 'usuarioSistemaId', 'usuario', 'userData', 'userMenu']
            .forEach(k => this.cookie.delete(k));
        this.usuarioSubject.next(null);
    }


    getUsuarioSistema = async () => (await axiosIns.get(`${url}${endpoints.usuarios}`)).data.data;
    createUsuarioSistema = async (d: any) => (await axiosIns.post(`${url}${endpoints.crear}`, d)).data;
    updateUsuarioSistema = async (id: number, d: any) => (await axiosIns.put(`${url}${endpoints.actualizar(id)}`, d)).data;
    deleteUsuarioSistema = async (id: number) => (await axiosIns.delete(`${url}${endpoints.eliminar(id)}`)).data;

}

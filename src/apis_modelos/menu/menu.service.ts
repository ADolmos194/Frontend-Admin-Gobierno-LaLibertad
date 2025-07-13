import { Injectable } from '@angular/core';
import { axiosIns, api_url } from '@/plugins/axios';

export const url = api_url;
export const endpoints = {
    menu: "autenticacion/menupermisos/"
};

@Injectable({
    providedIn: 'root',
})
export class MenuService {

    async getMenu() {
        try {
            const response = await axiosIns.get(`${url}${endpoints.menu}`);
            return response.data; // array de items del menú
        } catch (error) {
            console.error('Error al obtener el menú', error);
            throw error;
        }
    }
}

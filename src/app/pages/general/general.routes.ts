import { Routes } from '@angular/router';
import { Departamento } from './departamento';
import { Distrito } from './distrito';
import { Provincia } from './provincia';
import { Mercado } from './mercado';
import { Conversionunidadmedida } from './conversionunidadmedida';
import { Unidadmedida } from './unidadmedida';


export default [
    { path: 'unidadmedida', data: { breadcrumb: 'Unidadmedida' }, component: Unidadmedida },
    { path: 'conversionunidadmedida', data: { breadcrumb: 'Conversionunidadmedida' }, component: Conversionunidadmedida },
    { path: 'mercado', data: { breadcrumb: 'Mercado' }, component: Mercado },
    { path: 'departamento', data: { breadcrumb: 'Departamento' }, component: Departamento },
    { path: 'provincia', data: { breadcrumb: 'Provincia' }, component: Provincia },
    { path: 'distrito', data: { breadcrumb: 'Distrito' }, component: Distrito },

    { path: '**', redirectTo: '/notfound' }
] as Routes;

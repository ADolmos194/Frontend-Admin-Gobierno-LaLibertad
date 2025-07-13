import { Routes } from '@angular/router';
import { Departamento } from './departamento/departamento';
import { Distrito } from './distrito/distrito';
import { Provincia } from './provincia/provincia';
import { Mercado } from './mercado/mercado';
import { Conversionunidadmedida } from './conversionunidadmedida/conversionunidadmedida';
import { Unidadmedida } from './unidadmedida/unidadmedida';
import { Pais } from './pais/pais';


export default [
    { path: 'unidadmedida', data: { breadcrumb: 'Unidadmedida' }, component: Unidadmedida },
    { path: 'conversionunidadmedida', data: { breadcrumb: 'Conversionunidadmedida' }, component: Conversionunidadmedida },
    { path: 'mercado', data: { breadcrumb: 'Mercado' }, component: Mercado },
    { path: 'pais', data: { breadcrumb: 'Pais' }, component: Pais },
    { path: 'departamento', data: { breadcrumb: 'Departamento' }, component: Departamento },
    { path: 'provincia', data: { breadcrumb: 'Provincia' }, component: Provincia },
    { path: 'distrito', data: { breadcrumb: 'Distrito' }, component: Distrito },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

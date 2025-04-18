import { Routes } from '@angular/router';
import { Frutas } from './frutas';
import { Servicioagrario } from './servicioagrario';
import { Productoslacteos } from './productoslacteos';
import { Insumotecnologico } from './insumotecnologico';
import { Cerealeslegumbres } from './cerealeslegumbres';
import { Turberculosraices } from './tuberculosraices';
import { Pastosforrajes } from './pastosforrajes';


export default [
    { path: 'servicioagrario', data: { breadcrumb: 'Servicioagrario' }, component: Servicioagrario },
    { path: 'productoslacteos', data: { breadcrumb: 'Productoslacteos' }, component: Productoslacteos },
    { path: 'frutas', data: { breadcrumb: 'Frutas' }, component: Frutas },
    { path: 'insumotecnologico', data: { breadcrumb: 'Insumotecnologico' }, component: Insumotecnologico },
    { path: 'cerealeslegumbres', data: { breadcrumb: 'Cerealeslegumbres' }, component: Cerealeslegumbres },
    { path: 'tuberculosraices', data: { breadcrumb: 'Turberculosraices' }, component: Turberculosraices },
    { path: 'pastosforrajes', data: { breadcrumb: 'Pastosforrajes' }, component: Pastosforrajes },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

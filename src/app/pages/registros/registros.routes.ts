import { Routes } from '@angular/router';
import { Preciociudades } from './preciociudades';
import { Preciomercadomayoristaminorista } from './preciomercadomayoristaminorista';


export default [
    { path: 'preciomercadomayoristaminorista', data: { breadcrumb: 'Preciomercadomayoristaminorista' }, component: Preciomercadomayoristaminorista },
    { path: 'preciociudades', data: { breadcrumb: 'Preciociudades' }, component: Preciociudades },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

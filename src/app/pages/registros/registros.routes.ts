import { Routes } from '@angular/router';
import { PrecioCiudad } from './preciociudad/preciociudad';
import { Preciomercadomayoristaminorista } from './preciomercadomayoristaminorista/preciomercadomayoristaminorista';


export default [
    { path: 'preciomercadomayoristaminorista', data: { breadcrumb: 'Preciomercadomayoristaminorista' }, component: Preciomercadomayoristaminorista },
    { path: 'preciociudad', data: { breadcrumb: 'PrecioCiudad' }, component: PrecioCiudad },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

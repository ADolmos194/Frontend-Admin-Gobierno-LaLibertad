import { Routes } from '@angular/router';
import { Frutas } from './frutas';


export default [
    { path: 'frutas', data: { breadcrumb: 'Frutas' }, component: Frutas },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

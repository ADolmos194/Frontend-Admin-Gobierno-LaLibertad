import { Routes } from '@angular/router';
import { Productoagropecuario } from './productoagropecuario';


export default [
    { path: 'productoagropecuario', data: { breadcrumb: 'Productoagropecuario' }, component: Productoagropecuario },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

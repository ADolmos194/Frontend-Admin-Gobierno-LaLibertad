import { Routes } from '@angular/router';
import { Productos } from './productos';
import { Tipoproducto } from './tipoproducto';


export default [
    { path: 'productos', data: { breadcrumb: 'Productos' }, component: Productos },
    { path: 'tipoproducto', data: { breadcrumb: 'Tipoproducto' }, component: Tipoproducto },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

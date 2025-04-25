import { Routes } from '@angular/router';
import { Producto } from './producto/producto';
import { Tipoproducto } from './tipoproducto/tipoproducto';


export default [
    { path: 'producto', data: { breadcrumb: 'Producto' }, component: Producto },
    { path: 'tipoproducto', data: { breadcrumb: 'Tipoproducto' }, component: Tipoproducto },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

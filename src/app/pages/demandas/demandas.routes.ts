import { Routes } from '@angular/router';
import { DemandaProductoAgropecuario } from './demandaproductoagropecuario/demandaproductoagropecuario';
export default [
    { path: 'demandaproductoagropecuario', data: { breadcrumb: 'DemandaProductoAgropecuario' }, component: DemandaProductoAgropecuario },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

import { Routes } from '@angular/router';
import { DemandasGeneral } from './demandas/demandas';
export default [
    { path: 'demandas', data: { breadcrumb: 'DemandasGeneral' }, component: DemandasGeneral },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'general', loadChildren: () => import('./app/pages/general/general.routes') },
            { path: 'categorias', loadChildren: () => import('./app/pages/categorias/categorias.routes') },
            { path: 'registros', loadChildren: () => import('./app/pages/registros/registros.routes') },
            { path: 'ofertas', loadChildren: () => import('./app/pages/ofertas/ofertas.routes') },
            { path: 'demandas', loadChildren: () => import('./app/pages/demandas/demandas.routes') },
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];

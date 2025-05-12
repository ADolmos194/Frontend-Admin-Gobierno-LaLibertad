"use strict";
exports.__esModule = true;
exports.appRoutes = void 0;
var app_layout_1 = require("./app/layout/component/app.layout");
var dashboard_1 = require("./app/pages/dashboard/dashboard");
var notfound_1 = require("./app/pages/notfound/notfound");
var auth_guard_1 = require("./app/guards/auth.guard");
exports.appRoutes = [
    {
        path: '',
        component: app_layout_1.AppLayout,
        canActivate: [auth_guard_1.authGuard],
        children: [
            { path: '', component: dashboard_1.Dashboard },
            { path: 'general', loadChildren: function () { return Promise.resolve().then(function () { return require('./app/pages/general/general.routes'); }); } },
            { path: 'categorias', loadChildren: function () { return Promise.resolve().then(function () { return require('./app/pages/categorias/categorias.routes'); }); } },
            { path: 'registros', loadChildren: function () { return Promise.resolve().then(function () { return require('./app/pages/registros/registros.routes'); }); } },
            { path: 'ofertas', loadChildren: function () { return Promise.resolve().then(function () { return require('./app/pages/ofertas/ofertas.routes'); }); } },
            { path: 'demandas', loadChildren: function () { return Promise.resolve().then(function () { return require('./app/pages/demandas/demandas.routes'); }); } },
        ]
    },
    { path: 'notfound', component: notfound_1.Notfound },
    { path: 'auth', loadChildren: function () { return Promise.resolve().then(function () { return require('./app/pages/auth/auth.routes'); }); } },
    { path: '**', redirectTo: '/notfound' }
];

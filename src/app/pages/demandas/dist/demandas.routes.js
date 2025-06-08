"use strict";
exports.__esModule = true;
var demandas_1 = require("./demandas/demandas");
exports["default"] = [
    { path: 'demandas', data: { breadcrumb: 'DemandasGeneral' }, component: demandas_1.DemandasGeneral },
    { path: '**', redirectTo: '/notfound' }
];

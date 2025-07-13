"use strict";
exports.__esModule = true;
var departamento_1 = require("./departamento/departamento");
var distrito_1 = require("./distrito/distrito");
var provincia_1 = require("./provincia/provincia");
var mercado_1 = require("./mercado/mercado");
var conversionunidadmedida_1 = require("./conversionunidadmedida/conversionunidadmedida");
var unidadmedida_1 = require("./unidadmedida/unidadmedida");
var pais_1 = require("./pais/pais");
exports["default"] = [
    { path: 'unidadmedida', data: { breadcrumb: 'Unidadmedida' }, component: unidadmedida_1.Unidadmedida },
    { path: 'conversionunidadmedida', data: { breadcrumb: 'Conversionunidadmedida' }, component: conversionunidadmedida_1.Conversionunidadmedida },
    { path: 'mercado', data: { breadcrumb: 'Mercado' }, component: mercado_1.Mercado },
    { path: 'pais', data: { breadcrumb: 'Pais' }, component: pais_1.Pais },
    { path: 'departamento', data: { breadcrumb: 'Departamento' }, component: departamento_1.Departamento },
    { path: 'provincia', data: { breadcrumb: 'Provincia' }, component: provincia_1.Provincia },
    { path: 'distrito', data: { breadcrumb: 'Distrito' }, component: distrito_1.Distrito },
    { path: '**', redirectTo: '/notfound' }
];

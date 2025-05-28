"use strict";
exports.__esModule = true;
var frutas_1 = require("./frutas");
exports["default"] = [
    { path: 'frutas', data: { breadcrumb: 'Frutas' }, component: frutas_1.Frutas },
    { path: '**', redirectTo: '/notfound' }
];

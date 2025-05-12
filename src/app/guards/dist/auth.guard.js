"use strict";
exports.__esModule = true;
exports.authGuard = void 0;
var router_1 = require("@angular/router");
var autenticacion_service_1 = require("@/apis_modelos/autenticacion/autenticacion.service");
var core_1 = require("@angular/core");
exports.authGuard = function (route, state) {
    var usuarioService = core_1.inject(autenticacion_service_1.UsuarioSistemaService);
    var router = core_1.inject(router_1.Router);
    var usuario = localStorage.getItem('usuario'); // Verificación simple, puedes ajustarla con el servicio
    if (usuario) {
        return true; // Permite el acceso si el usuario está autenticado
    }
    else {
        router.navigate(['/auth/login']); // Redirige al login si no está autenticado
        return false; // Bloquea el acceso
    }
};

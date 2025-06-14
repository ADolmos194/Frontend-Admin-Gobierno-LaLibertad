"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppLogout = void 0;
var core_1 = require("@angular/core");
var button_1 = require("primeng/button");
var AppLogout = /** @class */ (function () {
    function AppLogout(router, usuariosistemaService) {
        this.router = router;
        this.usuariosistemaService = usuariosistemaService;
        this.usuario = 'Desconocido';
    }
    AppLogout.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.usuariosistemaService.usuario$.subscribe(function (usuario) {
            var _a;
            _this.usuario = (_a = usuario !== null && usuario !== void 0 ? usuario : localStorage.getItem('usuario')) !== null && _a !== void 0 ? _a : 'Desconocido';
        });
    };
    AppLogout.prototype.logout = function () {
        this.usuariosistemaService.clearUsuario();
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('usuarioSistemaId');
        localStorage.removeItem('usuario');
        this.router.navigate(['/auth/login']);
    };
    AppLogout.prototype.ngOnDestroy = function () {
        var _a;
        (_a = this.sub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    };
    AppLogout = __decorate([
        core_1.Component({
            standalone: true,
            selector: 'app-logout',
            imports: [button_1.ButtonModule],
            template: "\n    <div class=\"pt-2 flex gap-2 flex-wrap justify-start\">\n        <div>\n            <p class=\"text-lg font-semibold\">Usuario: {{ usuario }}</p>\n        </div>\n        <div>\n            <p-button severity=\"warn\" label=\"Cerrar Sesi\u00F3n\" (onClick)=\"logout()\"></p-button>\n        </div>\n    </div>",
            host: {
                "class": 'hidden absolute top-[3.25rem] right-0 w-72 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]'
            }
        })
    ], AppLogout);
    return AppLogout;
}());
exports.AppLogout = AppLogout;

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
    function AppLogout(router, usuariosistemaService, cookie) {
        this.router = router;
        this.usuariosistemaService = usuariosistemaService;
        this.cookie = cookie;
        this.email = 'Desconocido';
    }
    AppLogout.prototype.getTokenExpiration = function (token) {
        try {
            var payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp ? payload.exp * 1000 : null;
        }
        catch (e) {
            console.error('Token inválido', e);
            return null;
        }
    };
    AppLogout.prototype.ngOnInit = function () {
        var _this = this;
        var cookieData = this.cookie.get('userData');
        var accessToken = this.cookie.get('access_token');
        if (cookieData) {
            try {
                var user = JSON.parse(decodeURIComponent(cookieData));
                this.email = user.email || 'Desconocido';
            }
            catch (e) {
                console.error('Error al parsear userData', e);
            }
        }
        if (accessToken) {
            var exp = this.getTokenExpiration(accessToken);
            if (exp) {
                var now = Date.now();
                var timeout = exp - now;
                if (timeout > 0) {
                    setTimeout(function () {
                        _this.logout();
                    }, timeout);
                }
                else {
                    this.logout(); // token ya expirado
                }
            }
            else {
                this.logout(); // no se pudo leer expiración
            }
        }
        else {
            this.logout(); // sin token
        }
    };
    AppLogout.prototype.logout = function () {
        this.cookie["delete"]('access_token', '/');
        this.cookie["delete"]('refresh_token', '/');
        this.cookie["delete"]('userData', '/');
        this.usuariosistemaService.clearUsuario();
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
            template: "\n    <div class=\"pt-2 flex gap-2 flex-wrap justify-start\">\n        <div>\n            <p class=\"text-lg font-semibold\">{{ email }}</p>\n        </div>\n        <div>\n            <p-button severity=\"info\" label=\"Cerrar Sesi\u00F3n\" (onClick)=\"logout()\"></p-button>\n        </div>\n    </div>",
            host: {
                "class": 'hidden absolute top-[3.25rem] right-0 w-72 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]'
            }
        })
    ], AppLogout);
    return AppLogout;
}());
exports.AppLogout = AppLogout;

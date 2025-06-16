"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Login = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var button_1 = require("primeng/button");
var checkbox_1 = require("primeng/checkbox");
var inputtext_1 = require("primeng/inputtext");
var password_1 = require("primeng/password");
var divider_1 = require("primeng/divider");
var ripple_1 = require("primeng/ripple");
var autenticacion_service_1 = require("@/apis_modelos/autenticacion/autenticacion.service");
var api_1 = require("primeng/api");
var toast_1 = require("primeng/toast");
var app_floatingconfigurator_1 = require("../../../layout/component/app.floatingconfigurator");
var Login = /** @class */ (function () {
    function Login(usuariosistemaService, messageService, router) {
        this.usuariosistemaService = usuariosistemaService;
        this.messageService = messageService;
        this.router = router;
        this.isLoading = false;
        this.isLoadingCrearCuenta = false;
        this.enviar = false;
        this.usuariosistemalogin = {
            usuario: '',
            password: ''
        };
    }
    Login.prototype.irACrearCuenta = function () {
        var _this = this;
        this.isLoadingCrearCuenta = true;
        setTimeout(function () {
            _this.router.navigate(['/auth/register']);
        }, 2000);
    };
    Login.prototype.guardarUsuarioSistema = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var UsuarioSistemaParaEnviar, response, error_1, msg;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.enviar = true;
                        this.isLoading = true;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, 4, 5]);
                        UsuarioSistemaParaEnviar = {
                            usuario: this.usuariosistemalogin.usuario,
                            password: this.usuariosistemalogin.password
                        };
                        return [4 /*yield*/, this.usuariosistemaService.verificarUsuarioSistema(UsuarioSistemaParaEnviar)];
                    case 2:
                        response = _c.sent();
                        if (response.status === "success") {
                            this.usuariosistemaService.setUsuario(response.data.userData.usuario);
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Éxito',
                            detail: response.message_user || 'Inicio de sesión exitoso. Redirigiendo...'
                        });
                        setTimeout(function () {
                            _this.router.navigate(['/']);
                        }, 3000);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _c.sent();
                        msg = ((_b = (_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message_user) || 'Error inesperado';
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
                        return [3 /*break*/, 5];
                    case 4:
                        this.isLoading = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Login = __decorate([
        core_1.Component({
            selector: 'app-login',
            standalone: true,
            imports: [common_1.CommonModule, button_1.ButtonModule, checkbox_1.CheckboxModule, inputtext_1.InputTextModule, password_1.PasswordModule, forms_1.FormsModule, router_1.RouterModule, ripple_1.RippleModule, toast_1.ToastModule, app_floatingconfigurator_1.AppFloatingConfigurator, divider_1.DividerModule],
            templateUrl: './login.components.html',
            providers: [api_1.MessageService, autenticacion_service_1.UsuarioSistemaService, api_1.ConfirmationService]
        })
    ], Login);
    return Login;
}());
exports.Login = Login;

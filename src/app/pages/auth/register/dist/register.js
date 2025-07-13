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
exports.Register = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var button_1 = require("primeng/button");
var checkbox_1 = require("primeng/checkbox");
var inputtext_1 = require("primeng/inputtext");
var inputgroup_1 = require("primeng/inputgroup");
var inputgroupaddon_1 = require("primeng/inputgroupaddon");
var password_1 = require("primeng/password");
var divider_1 = require("primeng/divider");
var ripple_1 = require("primeng/ripple");
var select_1 = require("primeng/select");
var autenticacion_service_1 = require("@/apis_modelos/autenticacion/autenticacion_service/autenticacion.service");
var api_1 = require("primeng/api");
var toast_1 = require("primeng/toast");
var router_2 = require("@angular/router");
var progressspinner_1 = require("primeng/progressspinner");
var Register = /** @class */ (function () {
    function Register(usuariosistemaService, provinciaService, distritoService, messageService, router) {
        this.usuariosistemaService = usuariosistemaService;
        this.provinciaService = provinciaService;
        this.distritoService = distritoService;
        this.messageService = messageService;
        this.router = router;
        this.isLoading = false;
        this.isLoadingButton = false;
        this.enviar = false;
        this.usuariosistemaregister = {
            id: 0,
            nombrecompleto: '',
            usuario: '',
            password: '',
            email: '',
            tipodocumento: 'DNI',
            numerodocumento: '',
            numero_celular: '',
            numero_telefono: '',
            distrito_id: 0,
            direccion: '',
            terminos_condiciones: false,
            estado_id: 1
        };
        this.opcionesProvinciaActivas = [];
        this.opcionesDistritoActivos = [];
        this.tipodocuemtoselccionado = [
            { id: 'DNI', nombre: 'DNI' },
            { id: 'Carnet de Extranjería', nombre: 'Carnet de Extranjería' },
            { id: 'Pasaporte', nombre: 'Pasaporte' },
            { id: 'RUC', nombre: 'RUC' }
        ];
    }
    Register.prototype.irAlLogin = function () {
        var _this = this;
        setTimeout(function () { _this.isLoading = false; window.location.href = '/auth/login'; }, 2000);
    };
    Register.prototype.cargarOpciones = function (service, opcionesRef, label) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, service()];
                    case 1:
                        response = _a.sent();
                        opcionesRef.length = 0;
                        response.forEach(function (item) {
                            opcionesRef.push({
                                id: item.id,
                                nombre: item.nombre
                            });
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error al cargar " + label + ":", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Register.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, this.cargarOpciones(this.provinciaService.getProvinciasActivas.bind(this.provinciaService), this.opcionesProvinciaActivas, 'provincia activas')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.cargarOpciones(this.distritoService.getDistritosActivos.bind(this.distritoService), this.opcionesDistritoActivos, 'distrito activos')];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_2 = _a.sent();
                        console.error('Error al cargar datos iniciales:', error_2);
                        return [3 /*break*/, 6];
                    case 5:
                        this.isLoading = false;
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Register.prototype.guardarUsuarioSistema = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var campos, camposFaltantes, UsuarioSistemaParaEnviar, response, error_3, msg;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.enviar = true;
                        campos = [
                            { key: 'email', label: 'Email' },
                            { key: 'usuario', label: 'Usuario' },
                            { key: 'password', label: 'Contraseña' },
                            { key: 'nombrecompleto', label: 'Nombre completo' },
                            { key: 'tipodocumento', label: 'Tipo de documento' },
                            { key: 'numerodocumento', label: 'Número de documento' },
                            { key: 'numero_celular', label: 'Número de celular' },
                            { key: 'distrito_id', label: 'Distrito' }
                        ];
                        camposFaltantes = campos.filter(function (campo) { return !_this.usuariosistemaregister[campo.key]; });
                        if (camposFaltantes.length > 0) {
                            // Mostrar mensaje específico del primer campo vacío
                            this.messageService.add({
                                severity: 'warn',
                                summary: 'Campo requerido',
                                detail: "El campo " + camposFaltantes[0].label + " es requerido."
                            });
                            // Si hay más de uno, agregar mensaje general
                            if (camposFaltantes.length > 1) {
                                this.messageService.add({
                                    severity: 'info',
                                    summary: 'Completa el formulario',
                                    detail: 'Por favor completa todos los campos obligatorios.'
                                });
                            }
                            return [2 /*return*/];
                        }
                        this.isLoadingButton = true;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, 4, 5]);
                        UsuarioSistemaParaEnviar = {
                            id: this.usuariosistemaregister.id,
                            nombrecompleto: this.usuariosistemaregister.nombrecompleto,
                            usuario: this.usuariosistemaregister.usuario,
                            password: this.usuariosistemaregister.password,
                            email: this.usuariosistemaregister.email,
                            tipodocumento: this.usuariosistemaregister.tipodocumento,
                            numerodocumento: this.usuariosistemaregister.numerodocumento,
                            numero_celular: this.usuariosistemaregister.numero_celular,
                            numero_telefono: this.usuariosistemaregister.numero_telefono,
                            distrito: this.usuariosistemaregister.distrito_id,
                            direccion: this.usuariosistemaregister.direccion,
                            terminos_condiciones: this.usuariosistemaregister.terminos_condiciones,
                            estado: this.usuariosistemaregister.estado_id
                        };
                        return [4 /*yield*/, this.usuariosistemaService.createUsuarioSistema(UsuarioSistemaParaEnviar)];
                    case 2:
                        response = _c.sent();
                        if (response.status === 'success') {
                            localStorage.setItem('usuario', UsuarioSistemaParaEnviar.usuario);
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Éxito',
                            detail: response.message_user || 'Inicio de sesión exitoso. Redirigiendo...'
                        });
                        setTimeout(function () {
                            _this.isLoadingButton = false;
                            window.location.href = '/auth/login';
                        }, 1500);
                        return [3 /*break*/, 5];
                    case 3:
                        error_3 = _c.sent();
                        msg = ((_b = (_a = error_3 === null || error_3 === void 0 ? void 0 : error_3.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message_user) || 'Error inesperado';
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
                        return [3 /*break*/, 5];
                    case 4:
                        this.isLoadingButton = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Register = __decorate([
        core_1.Component({
            selector: 'app-login',
            standalone: true,
            imports: [common_1.CommonModule, button_1.ButtonModule, progressspinner_1.ProgressSpinnerModule, checkbox_1.CheckboxModule, inputtext_1.InputTextModule, password_1.PasswordModule, forms_1.FormsModule, router_1.RouterModule, ripple_1.RippleModule, toast_1.ToastModule, inputgroup_1.InputGroupModule, inputgroupaddon_1.InputGroupAddonModule, divider_1.DividerModule, select_1.SelectModule],
            templateUrl: './register.components.html',
            providers: [api_1.MessageService, autenticacion_service_1.UsuarioSistemaService, api_1.ConfirmationService, router_2.Router]
        })
    ], Register);
    return Register;
}());
exports.Register = Register;

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
exports.UsuarioSistemaService = exports.endpoints = exports.url = void 0;
var core_1 = require("@angular/core");
var axios_1 = require("@/plugins/axios");
var rxjs_1 = require("rxjs");
exports.url = axios_1.api_url;
exports.endpoints = {
    usuariosistemas: "autenticacion/usuariosistema/",
    verificacionusuariosistema: "autenticacion/verificacionusuariosistema/",
    crearUsuarioSistema: "autenticacion/usuariosistema/crear/",
    actualizarUsuarioSistema: function (id) { return "autenticacion/usuariosistema/actualizar/" + id + "/"; },
    eliminarUsuarioSistema: function (id) { return "autenticacion/usuariosistema/eliminar/" + id + "/"; }
};
var UsuarioSistemaService = /** @class */ (function () {
    function UsuarioSistemaService(cookie) {
        var _a;
        this.cookie = cookie;
        this.usuarioSubject = new rxjs_1.BehaviorSubject(null);
        this.usuario$ = (_a = this.usuarioSubject) === null || _a === void 0 ? void 0 : _a.asObservable();
        var rawUsuarioSistema = this.cookie.get('userData');
        if (rawUsuarioSistema) {
            try {
                var user = JSON.parse(decodeURIComponent(rawUsuarioSistema));
                if (user === null || user === void 0 ? void 0 : user.email) {
                    this.setUsuario(user.email);
                }
                else {
                    this.clearUsuario();
                }
            }
            catch (e) {
                console.error('Error al parsear usuarioSistema', e);
                this.clearUsuario();
            }
        }
        else {
            this.clearUsuario();
        }
    }
    UsuarioSistemaService.prototype.verificarUsuarioSistema = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var response, dataResponse, access, refresh, userData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.axiosIns.post("" + exports.url + exports.endpoints.verificacionusuariosistema, data)];
                    case 1:
                        response = _a.sent();
                        dataResponse = response.data.data;
                        access = dataResponse.access;
                        refresh = dataResponse.refresh;
                        userData = dataResponse.userData;
                        if (access && refresh && userData.email) {
                            this.cookie.set('access_token', access, 1, '/');
                            this.cookie.set('refresh_token', refresh, 1, '/');
                            this.cookie.set('userData', encodeURIComponent(JSON.stringify(userData)), 1, '/');
                            this.setUsuario(userData.email);
                        }
                        else {
                            console.error("Datos incompletos en la respuesta:", dataResponse);
                            throw new Error("La respuesta del servidor no contiene los datos necesarios.");
                        }
                        return [2 /*return*/, response.data];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error al verificar el Usuario del Sistema:', error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioSistemaService.prototype.setUsuario = function (email) {
        this.usuarioSubject.next(email);
    };
    UsuarioSistemaService.prototype.clearUsuario = function () {
        this.cookie["delete"]('access_token');
        this.cookie["delete"]('refresh_token');
        this.cookie["delete"]('usuarioSistemaId');
        this.cookie["delete"]('usuario');
        this.usuarioSubject.next(null);
    };
    UsuarioSistemaService.prototype.getUsuarioSistema = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.axiosIns.get("" + exports.url + exports.endpoints.usuariosistemas)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.data];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error al obtener los Usuarios del Sistema:', error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioSistemaService.prototype.createUsuarioSistema = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.axiosIns.post("" + exports.url + exports.endpoints.crearUsuarioSistema, data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error al crear el Usuario del Sistema:', error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioSistemaService.prototype.updateUsuarioSistema = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.axiosIns.put("" + exports.url + exports.endpoints.actualizarUsuarioSistema(id), data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Error al actualizar el Usuario del Sistema:', error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioSistemaService.prototype.deleteUsuarioSistema = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.axiosIns["delete"]("" + exports.url + exports.endpoints.eliminarUsuarioSistema(id))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_5 = _a.sent();
                        console.error('Error al eliminar el Usuario del Sistema:', error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioSistemaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsuarioSistemaService);
    return UsuarioSistemaService;
}());
exports.UsuarioSistemaService = UsuarioSistemaService;

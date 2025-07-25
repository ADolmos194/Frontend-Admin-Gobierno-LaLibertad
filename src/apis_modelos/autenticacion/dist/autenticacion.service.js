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
exports.UsuarioSistemaService = void 0;
var core_1 = require("@angular/core");
var axios_1 = require("@/plugins/axios");
var rxjs_1 = require("rxjs");
var url = axios_1.api_url;
var endpoints = {
    usuarios: "autenticacion/usuariosistema/",
    verificar: "autenticacion/verificacionusuariosistema/",
    crear: "autenticacion/usuariosistema/crear/",
    actualizar: function (id) { return "autenticacion/usuariosistema/actualizar/" + id + "/"; },
    eliminar: function (id) { return "autenticacion/usuariosistema/eliminar/" + id + "/"; }
};
var UsuarioSistemaService = /** @class */ (function () {
    function UsuarioSistemaService(cookie) {
        var _this = this;
        this.cookie = cookie;
        this.usuarioSubject = new rxjs_1.BehaviorSubject(null);
        this.usuario$ = this.usuarioSubject.asObservable();
        this.getUsuarioSistema = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.axiosIns.get("" + url + endpoints.usuarios)];
                case 1: return [2 /*return*/, (_a.sent()).data.data];
            }
        }); }); };
        this.createUsuarioSistema = function (d) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.axiosIns.post("" + url + endpoints.crear, d)];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); };
        this.updateUsuarioSistema = function (id, d) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.axiosIns.put("" + url + endpoints.actualizar(id), d)];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); };
        this.deleteUsuarioSistema = function (id) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.axiosIns["delete"]("" + url + endpoints.eliminar(id))];
                case 1: return [2 /*return*/, (_a.sent()).data];
            }
        }); }); };
        var data = this.cookie.get('userData');
        try {
            var user = JSON.parse(decodeURIComponent(data));
            this.setUsuario((user === null || user === void 0 ? void 0 : user.email) || null);
        }
        catch (_a) {
            this.clearUsuario();
        }
    }
    UsuarioSistemaService.prototype.verificarUsuarioSistema = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, access, refresh, userData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios_1.axiosIns.post("" + url + endpoints.verificar, data)];
                    case 1:
                        res = _b.sent();
                        _a = res.data.data || {}, access = _a.access, refresh = _a.refresh, userData = _a.userData;
                        if (access && refresh && (userData === null || userData === void 0 ? void 0 : userData.email)) {
                            this.cookie.set('access_token', access, 1, '/');
                            this.cookie.set('refresh_token', refresh, 1, '/');
                            this.cookie.set('userData', encodeURIComponent(JSON.stringify(userData)), 1, '/');
                            this.setUsuario(userData.email);
                            return [2 /*return*/, res.data];
                        }
                        throw new Error('Respuesta inválida del servidor.');
                }
            });
        });
    };
    UsuarioSistemaService.prototype.setUsuario = function (email) {
        this.usuarioSubject.next(email);
    };
    UsuarioSistemaService.prototype.clearUsuario = function () {
        var _this = this;
        ['access_token', 'refresh_token', 'usuarioSistemaId', 'usuario', 'userData'].forEach(function (k) { return _this.cookie["delete"](k); });
        this.usuarioSubject.next(null);
    };
    UsuarioSistemaService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], UsuarioSistemaService);
    return UsuarioSistemaService;
}());
exports.UsuarioSistemaService = UsuarioSistemaService;

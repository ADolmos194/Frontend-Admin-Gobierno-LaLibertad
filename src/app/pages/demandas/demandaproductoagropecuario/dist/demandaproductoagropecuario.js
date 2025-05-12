"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.DemandaProductoAgropecuario = void 0;
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var table_1 = require("primeng/table");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var button_1 = require("primeng/button");
var ripple_1 = require("primeng/ripple");
var toast_1 = require("primeng/toast");
var toolbar_1 = require("primeng/toolbar");
var rating_1 = require("primeng/rating");
var inputtext_1 = require("primeng/inputtext");
var textarea_1 = require("primeng/textarea");
var select_1 = require("primeng/select");
var multiselect_1 = require("primeng/multiselect");
var radiobutton_1 = require("primeng/radiobutton");
var inputnumber_1 = require("primeng/inputnumber");
var dialog_1 = require("primeng/dialog");
var tag_1 = require("primeng/tag");
var inputicon_1 = require("primeng/inputicon");
var iconfield_1 = require("primeng/iconfield");
var confirmdialog_1 = require("primeng/confirmdialog");
var dataview_1 = require("primeng/dataview");
var tag_2 = require("primeng/tag");
var selectbutton_1 = require("primeng/selectbutton");
var demandaproductosagropecuarios_service_1 = require("@/apis_modelos/demandas/demandaproductosagropecuarios/demandaproductosagropecuarios.service");
var checkbox_1 = require("primeng/checkbox");
var drawer_1 = require("primeng/drawer");
var skeleton_1 = require("primeng/skeleton");
var divider_1 = require("primeng/divider");
var carousel_1 = require("primeng/carousel");
var galleria_1 = require("primeng/galleria");
var card_1 = require("primeng/card");
var imagenes_service_1 = require("@/apis_modelos/imagenes/imagenes.service");
var datepicker_1 = require("primeng/datepicker");
var fileupload_1 = require("primeng/fileupload");
;
var DemandaProductoAgropecuario = /** @class */ (function () {
    function DemandaProductoAgropecuario(demandaproductoagropecuarioService, messageService, estadoService, provinciaService, distritoService, productoService, tipoproductoService, imageUploadService, usuariosistemaService) {
        this.demandaproductoagropecuarioService = demandaproductoagropecuarioService;
        this.messageService = messageService;
        this.estadoService = estadoService;
        this.provinciaService = provinciaService;
        this.distritoService = distritoService;
        this.productoService = productoService;
        this.tipoproductoService = tipoproductoService;
        this.imageUploadService = imageUploadService;
        this.usuariosistemaService = usuariosistemaService;
        this.demandaproductoagropecuarioDialogo = false;
        this.demandasproductosagropecuarios = core_1.signal([]);
        this.fechaHoy = new Date();
        this.demandaproductoagropecuario = {
            id: 0,
            provincia_id: 0,
            distrito_id: 0,
            nombre_provincia_distrito: '',
            fecha_publicacion: this.fechaHoy.toISOString().split('T')[0],
            tipoproducto_id: 0,
            nombre_tipoproducto: '',
            producto_id: 0,
            nombre_producto: '',
            url_imagen: '',
            descripcion: '',
            nota: '',
            direccion: '',
            contacto: '',
            telefono: '',
            email: '',
            usuariosistema_id: 0,
            estado_id: 1,
            fecha_creacion: '',
            fecha_modificacion: ''
        };
        this.enviar = false;
        this.isLoading = false;
        this.accion = 1;
        this.opcionesEstado = [];
        this.opcionesProvinciasActivas = [];
        this.opcionesDistritosActivos = [];
        this.opcionesProductosActivos = [];
        this.opcionesTipoProductosActivos = [];
        this.opcionesUsuarioSistemaActivos = [];
        this.layout = 'grid';
        this.options = ['grid'];
        this.selectedFile = null;
        this.uploadedFiles = [];
        this.estado = [
            { label: 'ACTIVO', value: 1 },
            { label: 'INACTIVO', value: 2 }
        ];
        this.demandasProductosAgropecuarios = [];
    }
    DemandaProductoAgropecuario.prototype.onImageSelected = function (event) {
        var file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
        }
    };
    DemandaProductoAgropecuario.prototype.onFileUpload = function (event) {
        var file = event.files[0];
        if (file) {
            this.uploadedFiles = [file];
            this.selectedFile = file;
            this.messageService.add({ severity: 'info', summary: 'Imagen insertada', detail: '' });
        }
    };
    DemandaProductoAgropecuario.prototype.onGlobalFilter = function (table, event) {
        table.filterGlobal(event.target.value, 'contains');
    };
    DemandaProductoAgropecuario.prototype.cargarDemandaProductosAgropecuarios = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usuarioId, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        usuarioId = Number(localStorage.getItem('usuarioSistemaId'));
                        if (!usuarioId) {
                            throw new Error('Usuario no autenticado');
                        }
                        return [4 /*yield*/, this.demandaproductoagropecuarioService.getDemandaProductosAgropecuarios(usuarioId)];
                    case 2:
                        response = _a.sent();
                        this.demandasproductosagropecuarios.set(response);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error al cargar las demandas productos agropecuarios', error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        this.isLoading = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DemandaProductoAgropecuario.prototype.cargarOpciones = function (service, opcionesRef, label) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
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
                        error_2 = _a.sent();
                        console.error("Error al cargar " + label + ":", error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DemandaProductoAgropecuario.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, 9, 10]);
                        return [4 /*yield*/, Promise.all([this.cargarOpciones(this.provinciaService.getProvinciasActivas.bind(this.provinciaService), this.opcionesProvinciasActivas, 'provincias activas')])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Promise.all([this.cargarOpciones(this.distritoService.getDistritosActivos.bind(this.distritoService), this.opcionesDistritosActivos, 'distritos activos')])];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, Promise.all([this.cargarOpciones(this.productoService.getProductosActivos.bind(this.productoService), this.opcionesProductosActivos, 'productos activos')])];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, Promise.all([this.cargarOpciones(this.tipoproductoService.getTipoProductoActivos.bind(this.tipoproductoService), this.opcionesTipoProductosActivos, 'tipos productos activos')])];
                    case 5:
                        _a.sent();
                        this.usuariosistemaService.getUsuarioSistema().then(function (response) {
                            _this.opcionesUsuarioSistemaActivos = response;
                            var usuarioId = Number(localStorage.getItem('usuarioSistemaId'));
                            _this.demandaproductoagropecuario.usuariosistema_id = usuarioId;
                        });
                        return [4 /*yield*/, Promise.all([this.cargarOpciones(this.estadoService.getEstado.bind(this.estadoService), this.opcionesEstado, 'estado')])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.cargarDemandaProductosAgropecuarios()];
                    case 7:
                        _a.sent();
                        this.demandasProductosAgropecuarios = this.demandasproductosagropecuarios();
                        return [3 /*break*/, 10];
                    case 8:
                        error_3 = _a.sent();
                        console.error('Error al cargar los país:', error_3);
                        return [3 /*break*/, 10];
                    case 9:
                        this.isLoading = false;
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    DemandaProductoAgropecuario.prototype.abrirNuevo = function () {
        this.accion = 1;
        this.enviar = false;
        this.limpiarDatos();
        var usuarioId = Number(localStorage.getItem('usuarioSistemaId'));
        this.demandaproductoagropecuario.usuariosistema_id = usuarioId;
        this.demandaproductoagropecuarioDialogo = true;
    };
    DemandaProductoAgropecuario.prototype.limpiarDatos = function () {
        var usuarioId = Number(localStorage.getItem('usuarioSistemaId'));
        this.demandaproductoagropecuario = {
            id: 0,
            provincia_id: 0,
            distrito_id: 0,
            nombre_provincia_distrito: '',
            fecha_publicacion: this.fechaHoy.toISOString().split('T')[0],
            tipoproducto_id: 0,
            nombre_tipoproducto: '',
            producto_id: 0,
            nombre_producto: '',
            url_imagen: '',
            descripcion: '',
            nota: '',
            direccion: '',
            contacto: '',
            telefono: '',
            email: '',
            usuariosistema_id: usuarioId,
            estado_id: 1,
            fecha_creacion: '',
            fecha_modificacion: ''
        };
    };
    DemandaProductoAgropecuario.prototype.ocultarDialogo = function () {
        this.demandaproductoagropecuarioDialogo = false;
        this.enviar = false;
    };
    DemandaProductoAgropecuario.prototype.guardarDemandaProductoAgropecuario = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var fechaPublicacion, uploadResp, usuarioSistemaId, DemandaProductoAgropecuarioParaEnviar, response, _c, error_4, msg;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.enviar = true;
                        this.isLoading = true;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 9, 10, 11]);
                        fechaPublicacion = new Date(this.demandaproductoagropecuario.fecha_publicacion);
                        this.demandaproductoagropecuario.fecha_publicacion = fechaPublicacion.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
                        if (!this.selectedFile) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.imageUploadService.uploadImage(this.selectedFile).toPromise()];
                    case 2:
                        uploadResp = _d.sent();
                        this.demandaproductoagropecuario.url_imagen = uploadResp.secure_url;
                        _d.label = 3;
                    case 3:
                        usuarioSistemaId = Number(localStorage.getItem('usuarioSistemaId'));
                        if (!usuarioSistemaId) {
                            throw new Error('Usuario no autenticado');
                        }
                        DemandaProductoAgropecuarioParaEnviar = {
                            id: this.demandaproductoagropecuario.id,
                            provincia: this.demandaproductoagropecuario.provincia_id,
                            distrito: this.demandaproductoagropecuario.distrito_id,
                            fecha_publicacion: this.demandaproductoagropecuario.fecha_publicacion,
                            tipoproducto: this.demandaproductoagropecuario.tipoproducto_id || null,
                            producto: this.demandaproductoagropecuario.producto_id || null,
                            url_imagen: this.demandaproductoagropecuario.url_imagen,
                            descripcion: this.demandaproductoagropecuario.descripcion,
                            nota: this.demandaproductoagropecuario.nota,
                            direccion: this.demandaproductoagropecuario.direccion,
                            contacto: this.demandaproductoagropecuario.contacto,
                            telefono: this.demandaproductoagropecuario.telefono,
                            email: this.demandaproductoagropecuario.email,
                            usuariosistema: usuarioSistemaId,
                            estado: this.demandaproductoagropecuario.estado_id,
                            fecha_creacion: this.demandaproductoagropecuario.fecha_creacion,
                            fecha_modificacion: this.demandaproductoagropecuario.fecha_modificacion
                        };
                        if (!(this.accion === 1)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.demandaproductoagropecuarioService.createDemandaProductosAgropecuarios(DemandaProductoAgropecuarioParaEnviar)];
                    case 4:
                        _c = _d.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.demandaproductoagropecuarioService.updateDemandaProductosAgropecuarios(this.demandaproductoagropecuario.id, DemandaProductoAgropecuarioParaEnviar)];
                    case 6:
                        _c = _d.sent();
                        _d.label = 7;
                    case 7:
                        response = _c;
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user || 'Operación exitosa' });
                        return [4 /*yield*/, this.cargarDemandaProductosAgropecuarios()];
                    case 8:
                        _d.sent();
                        this.ocultarDialogo();
                        return [3 /*break*/, 11];
                    case 9:
                        error_4 = _d.sent();
                        msg = ((_b = (_a = error_4 === null || error_4 === void 0 ? void 0 : error_4.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message_user) || 'Error inesperado';
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
                        return [3 /*break*/, 11];
                    case 10:
                        this.isLoading = false;
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    DemandaProductoAgropecuario.prototype.getEstado = function (estado_id) {
        switch (estado_id) {
            case 1:
                return 'ACTIVO';
            case 2:
                return 'INACTIVO';
            default:
                return 'ELIMINADO';
        }
    };
    DemandaProductoAgropecuario.prototype.getEstadoSeverity = function (estado_id) {
        switch (estado_id) {
            case 1:
                return 'success';
            case 2:
                return 'danger';
            default:
                return 'info';
        }
    };
    DemandaProductoAgropecuario.prototype.editarDemandaProductosAgropecuarios = function (demandaproductoagropecuario) {
        this.demandaproductoagropecuario = __assign({}, demandaproductoagropecuario);
        this.accion = 2;
        this.demandaproductoagropecuarioDialogo = true;
    };
    DemandaProductoAgropecuario.prototype.eliminarDemandaProductosAgropecuarios = function (demandaproductoagropecuario) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var id, response, error_5, msg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = demandaproductoagropecuario.id;
                        this.isLoading = true;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, this.demandaproductoagropecuarioService.deleteDemandaProductosAgropecuarios(id)];
                    case 2:
                        response = _c.sent();
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user });
                        return [4 /*yield*/, this.cargarDemandaProductosAgropecuarios()];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_5 = _c.sent();
                        msg = ((_b = (_a = error_5 === null || error_5 === void 0 ? void 0 : error_5.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message_user) || 'Error inesperado';
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
                        return [3 /*break*/, 6];
                    case 5:
                        this.isLoading = false;
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DemandaProductoAgropecuario = __decorate([
        core_1.Component({
            selector: 'app-demnadaproductoagropecuario',
            standalone: true,
            imports: [
                common_1.CommonModule,
                dataview_1.DataView,
                table_1.TableModule,
                drawer_1.DrawerModule,
                forms_1.FormsModule,
                button_1.ButtonModule,
                checkbox_1.CheckboxModule,
                ripple_1.RippleModule,
                toast_1.ToastModule,
                toolbar_1.ToolbarModule,
                rating_1.RatingModule,
                inputtext_1.InputTextModule,
                textarea_1.TextareaModule,
                select_1.SelectModule,
                multiselect_1.MultiSelectModule,
                radiobutton_1.RadioButtonModule,
                inputnumber_1.InputNumberModule,
                dialog_1.DialogModule,
                tag_1.TagModule,
                inputicon_1.InputIconModule,
                iconfield_1.IconFieldModule,
                confirmdialog_1.ConfirmDialogModule,
                tag_2.Tag,
                selectbutton_1.SelectButton,
                skeleton_1.Skeleton,
                divider_1.DividerModule,
                carousel_1.CarouselModule,
                galleria_1.GalleriaModule,
                card_1.CardModule,
                datepicker_1.DatePicker,
                fileupload_1.FileUpload
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            templateUrl: "./demandaproductoagropecuario.components.html",
            providers: [api_1.MessageService, demandaproductosagropecuarios_service_1.DemandaProductosAgropecuariosService, api_1.ConfirmationService, imagenes_service_1.ImageUploadService]
        })
    ], DemandaProductoAgropecuario);
    return DemandaProductoAgropecuario;
}());
exports.DemandaProductoAgropecuario = DemandaProductoAgropecuario;

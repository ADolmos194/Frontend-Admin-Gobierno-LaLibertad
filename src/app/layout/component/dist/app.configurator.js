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
exports.__esModule = true;
exports.AppConfigurator = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var themes_1 = require("@primeng/themes");
var aura_1 = require("@primeng/themes/aura");
var lara_1 = require("@primeng/themes/lara");
var nora_1 = require("@primeng/themes/nora");
var config_1 = require("primeng/config");
var selectbutton_1 = require("primeng/selectbutton");
var layout_service_1 = require("../service/layout.service");
var presets = {
    Aura: aura_1["default"],
    Lara: lara_1["default"],
    Nora: nora_1["default"]
};
var AppConfigurator = /** @class */ (function () {
    function AppConfigurator() {
        var _this = this;
        this.router = core_1.inject(router_1.Router);
        this.config = core_1.inject(config_1.PrimeNG);
        this.layoutService = core_1.inject(layout_service_1.LayoutService);
        this.platformId = core_1.inject(core_1.PLATFORM_ID);
        this.primeng = core_1.inject(config_1.PrimeNG);
        this.presets = Object.keys(presets);
        this.showMenuModeButton = core_1.signal(!this.router.url.includes('auth'));
        this.menuModeOptions = [
            { label: 'Static', value: 'static' },
            { label: 'Overlay', value: 'overlay' }
        ];
        this.surfaces = [
            {
                name: 'slate',
                palette: {
                    0: '#ffffff',
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617'
                }
            },
            {
                name: 'gray',
                palette: {
                    0: '#ffffff',
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                    950: '#030712'
                }
            },
            {
                name: 'zinc',
                palette: {
                    0: '#ffffff',
                    50: '#fafafa',
                    100: '#f4f4f5',
                    200: '#e4e4e7',
                    300: '#d4d4d8',
                    400: '#a1a1aa',
                    500: '#71717a',
                    600: '#52525b',
                    700: '#3f3f46',
                    800: '#27272a',
                    900: '#18181b',
                    950: '#09090b'
                }
            },
            {
                name: 'neutral',
                palette: {
                    0: '#ffffff',
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                    950: '#0a0a0a'
                }
            },
            {
                name: 'stone',
                palette: {
                    0: '#ffffff',
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                    950: '#0c0a09'
                }
            },
            {
                name: 'soho',
                palette: {
                    0: '#ffffff',
                    50: '#ececec',
                    100: '#dedfdf',
                    200: '#c4c4c6',
                    300: '#adaeb0',
                    400: '#97979b',
                    500: '#7f8084',
                    600: '#6a6b70',
                    700: '#55565b',
                    800: '#3f4046',
                    900: '#2c2c34',
                    950: '#16161d'
                }
            },
            {
                name: 'viva',
                palette: {
                    0: '#ffffff',
                    50: '#f3f3f3',
                    100: '#e7e7e8',
                    200: '#cfd0d0',
                    300: '#b7b8b9',
                    400: '#9fa1a1',
                    500: '#87898a',
                    600: '#6e7173',
                    700: '#565a5b',
                    800: '#3e4244',
                    900: '#262b2c',
                    950: '#0e1315'
                }
            },
            {
                name: 'ocean',
                palette: {
                    0: '#ffffff',
                    50: '#fbfcfc',
                    100: '#F7F9F8',
                    200: '#EFF3F2',
                    300: '#DADEDD',
                    400: '#B1B7B6',
                    500: '#828787',
                    600: '#5F7274',
                    700: '#415B61',
                    800: '#29444E',
                    900: '#183240',
                    950: '#0c1920'
                }
            }
        ];
        this.selectedPrimaryColor = core_1.computed(function () {
            return _this.layoutService.layoutConfig().primary;
        });
        this.selectedSurfaceColor = core_1.computed(function () { return _this.layoutService.layoutConfig().surface; });
        this.selectedPreset = core_1.computed(function () { return _this.layoutService.layoutConfig().preset; });
        this.menuMode = core_1.computed(function () { return _this.layoutService.layoutConfig().menuMode; });
        this.primaryColors = core_1.computed(function () {
            var presetPalette = presets[_this.layoutService.layoutConfig().preset].primitive;
            var colors = ['emerald', 'green', 'lime', 'orange', 'amber', 'yellow', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
            var palettes = [{ name: 'noir', palette: {} }];
            colors.forEach(function (color) {
                palettes.push({
                    name: color,
                    palette: presetPalette === null || presetPalette === void 0 ? void 0 : presetPalette[color]
                });
            });
            return palettes;
        });
    }
    AppConfigurator.prototype.ngOnInit = function () {
        if (common_1.isPlatformBrowser(this.platformId)) {
            this.onPresetChange(this.layoutService.layoutConfig().preset);
        }
    };
    AppConfigurator.prototype.getPresetExt = function () {
        var _this = this;
        var color = this.primaryColors().find(function (c) { return c.name === _this.selectedPrimaryColor(); }) || {};
        var preset = this.layoutService.layoutConfig().preset;
        if (color.name === 'noir') {
            return {
                semantic: {
                    primary: {
                        50: '{surface.50}',
                        100: '{surface.100}',
                        200: '{surface.200}',
                        300: '{surface.300}',
                        400: '{surface.400}',
                        500: '{surface.500}',
                        600: '{surface.600}',
                        700: '{surface.700}',
                        800: '{surface.800}',
                        900: '{surface.900}',
                        950: '{surface.950}'
                    },
                    colorScheme: {
                        light: {
                            primary: {
                                color: '{primary.950}',
                                contrastColor: '#ffffff',
                                hoverColor: '{primary.800}',
                                activeColor: '{primary.700}'
                            },
                            highlight: {
                                background: '{primary.950}',
                                focusBackground: '{primary.700}',
                                color: '#ffffff',
                                focusColor: '#ffffff'
                            }
                        },
                        dark: {
                            primary: {
                                color: '{primary.50}',
                                contrastColor: '{primary.950}',
                                hoverColor: '{primary.200}',
                                activeColor: '{primary.300}'
                            },
                            highlight: {
                                background: '{primary.50}',
                                focusBackground: '{primary.300}',
                                color: '{primary.950}',
                                focusColor: '{primary.950}'
                            }
                        }
                    }
                }
            };
        }
        else {
            if (preset === 'Nora') {
                return {
                    semantic: {
                        primary: color.palette,
                        colorScheme: {
                            light: {
                                primary: {
                                    color: '{primary.600}',
                                    contrastColor: '#ffffff',
                                    hoverColor: '{primary.700}',
                                    activeColor: '{primary.800}'
                                },
                                highlight: {
                                    background: '{primary.600}',
                                    focusBackground: '{primary.700}',
                                    color: '#ffffff',
                                    focusColor: '#ffffff'
                                }
                            },
                            dark: {
                                primary: {
                                    color: '{primary.500}',
                                    contrastColor: '{surface.900}',
                                    hoverColor: '{primary.400}',
                                    activeColor: '{primary.300}'
                                },
                                highlight: {
                                    background: '{primary.500}',
                                    focusBackground: '{primary.400}',
                                    color: '{surface.900}',
                                    focusColor: '{surface.900}'
                                }
                            }
                        }
                    }
                };
            }
            else {
                return {
                    semantic: {
                        primary: color.palette,
                        colorScheme: {
                            light: {
                                primary: {
                                    color: '{primary.500}',
                                    contrastColor: '#ffffff',
                                    hoverColor: '{primary.600}',
                                    activeColor: '{primary.700}'
                                },
                                highlight: {
                                    background: '{primary.50}',
                                    focusBackground: '{primary.100}',
                                    color: '{primary.700}',
                                    focusColor: '{primary.800}'
                                }
                            },
                            dark: {
                                primary: {
                                    color: '{primary.400}',
                                    contrastColor: '{surface.900}',
                                    hoverColor: '{primary.300}',
                                    activeColor: '{primary.200}'
                                },
                                highlight: {
                                    background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                                    focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                                    color: 'rgba(255,255,255,.87)',
                                    focusColor: 'rgba(255,255,255,.87)'
                                }
                            }
                        }
                    }
                };
            }
        }
    };
    AppConfigurator.prototype.updateColors = function (event, type, color) {
        if (type === 'primary') {
            this.layoutService.layoutConfig.update(function (state) { return (__assign(__assign({}, state), { primary: color.name })); });
        }
        else if (type === 'surface') {
            this.layoutService.layoutConfig.update(function (state) { return (__assign(__assign({}, state), { surface: color.name })); });
        }
        this.applyTheme(type, color);
        event.stopPropagation();
    };
    AppConfigurator.prototype.applyTheme = function (type, color) {
        if (type === 'primary') {
            themes_1.updatePreset(this.getPresetExt());
        }
        else if (type === 'surface') {
            themes_1.updateSurfacePalette(color.palette);
        }
    };
    AppConfigurator.prototype.onPresetChange = function (event) {
        var _this = this;
        var _a;
        this.layoutService.layoutConfig.update(function (state) { return (__assign(__assign({}, state), { preset: event })); });
        var preset = presets[event];
        var surfacePalette = (_a = this.surfaces.find(function (s) { return s.name === _this.selectedSurfaceColor(); })) === null || _a === void 0 ? void 0 : _a.palette;
        themes_1.$t().preset(preset).preset(this.getPresetExt()).surfacePalette(surfacePalette).use({ useDefaultOptions: true });
    };
    AppConfigurator.prototype.onMenuModeChange = function (event) {
        this.layoutService.layoutConfig.update(function (prev) { return (__assign(__assign({}, prev), { menuMode: event })); });
    };
    AppConfigurator = __decorate([
        core_1.Component({
            selector: 'app-configurator',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.FormsModule, selectbutton_1.SelectButtonModule],
            template: "\n        <div class=\"flex flex-col gap-4\">\n            <div>\n                <span class=\"text-sm text-muted-color font-semibold\">Primary</span>\n                <div class=\"pt-2 flex gap-2 flex-wrap justify-start\">\n                    @for (primaryColor of primaryColors(); track primaryColor.name) {\n                        <button\n                            type=\"button\"\n                            [title]=\"primaryColor.name\"\n                            (click)=\"updateColors($event, 'primary', primaryColor)\"\n                            [ngClass]=\"{ 'outline-primary': primaryColor.name === selectedPrimaryColor() }\"\n                            class=\"border-none w-5 h-5 rounded-full p-0 cursor-pointer outline-none outline-offset-1\"\n                            [style]=\"{\n                                'background-color': primaryColor?.name === 'noir' ? 'var(--text-color)' : primaryColor?.palette?.['500']\n                            }\"\n                        ></button>\n                    }\n                </div>\n            </div>\n            <div>\n                <span class=\"text-sm text-muted-color font-semibold\">Surface</span>\n                <div class=\"pt-2 flex gap-2 flex-wrap justify-start\">\n                    @for (surface of surfaces; track surface.name) {\n                        <button\n                            type=\"button\"\n                            [title]=\"surface.name\"\n                            (click)=\"updateColors($event, 'surface', surface)\"\n                            [ngClass]=\"{ 'outline-primary': selectedSurfaceColor() ? selectedSurfaceColor() === surface.name : layoutService.layoutConfig().darkTheme ? surface.name === 'zinc' : surface.name === 'slate' }\"\n                            class=\"border-none w-5 h-5 rounded-full p-0 cursor-pointer outline-none outline-offset-1\"\n                            [style]=\"{\n                                'background-color': surface?.name === 'noir' ? 'var(--text-color)' : surface?.palette?.['500']\n                            }\"\n                        ></button>\n                    }\n                </div>\n            </div>\n            <div class=\"flex flex-col gap-2\">\n                <span class=\"text-sm text-muted-color font-semibold\">Presets</span>\n                <p-selectbutton [options]=\"presets\" [ngModel]=\"selectedPreset()\" (ngModelChange)=\"onPresetChange($event)\" [allowEmpty]=\"false\" size=\"small\" />\n            </div>\n            <div *ngIf=\"showMenuModeButton()\" class=\"flex flex-col gap-2\">\n                <span class=\"text-sm text-muted-color font-semibold\">Menu Mode</span>\n                <p-selectbutton [ngModel]=\"menuMode()\" (ngModelChange)=\"onMenuModeChange($event)\" [options]=\"menuModeOptions\" [allowEmpty]=\"false\" size=\"small\" />\n            </div>\n        </div>\n    ",
            host: {
                "class": 'hidden absolute top-[3.25rem] right-0 w-72 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]'
            }
        })
    ], AppConfigurator);
    return AppConfigurator;
}());
exports.AppConfigurator = AppConfigurator;

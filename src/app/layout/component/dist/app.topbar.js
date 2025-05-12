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
exports.AppTopbar = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var styleclass_1 = require("primeng/styleclass");
var app_configurator_1 = require("./app.configurator");
var app_logout_1 = require("./app.logout");
var AppTopbar = /** @class */ (function () {
    function AppTopbar(layoutService) {
        this.layoutService = layoutService;
    }
    AppTopbar.prototype.toggleDarkMode = function () {
        this.layoutService.layoutConfig.update(function (state) { return (__assign(__assign({}, state), { darkTheme: !state.darkTheme })); });
    };
    AppTopbar = __decorate([
        core_1.Component({
            selector: 'app-topbar',
            standalone: true,
            imports: [router_1.RouterModule, common_1.CommonModule, styleclass_1.StyleClassModule, app_configurator_1.AppConfigurator, app_logout_1.AppLogout],
            template: " <div class=\"layout-topbar\">\n        <div class=\"layout-topbar-logo-container\">\n            <button class=\"layout-menu-button layout-topbar-action\" (click)=\"layoutService.onMenuToggle()\">\n                <i class=\"pi pi-bars\"></i>\n            </button>\n            <a class=\"layout-topbar-logo\" routerLink=\"/\">\n                <span>AGROCULTURA GOBPE</span>\n            </a>\n        </div>\n\n        <div class=\"layout-topbar-actions\">\n            <div class=\"layout-config-menu\">\n                <button type=\"button\" class=\"layout-topbar-action\" (click)=\"toggleDarkMode()\">\n                    <i [ngClass]=\"{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }\"></i>\n                </button>\n                <div class=\"relative\">\n                    <button\n                        class=\"layout-topbar-action layout-topbar-action-highlight\"\n                        pStyleClass=\"@next\"\n                        enterFromClass=\"hidden\"\n                        enterActiveClass=\"animate-scalein\"\n                        leaveToClass=\"hidden\"\n                        leaveActiveClass=\"animate-fadeout\"\n                        [hideOnOutsideClick]=\"true\"\n                    >\n                        <i class=\"pi pi-palette\"></i>\n                    </button>\n                    <app-configurator />\n                </div>\n            </div>\n\n            <div class=\"relative\">\n                <button class=\"layout-topbar-action layout-topbar-action-highlight\"\n                    pStyleClass=\"@next\"\n                    enterFromClass=\"hidden\"\n                    enterActiveClass=\"animate-scalein\"\n                    leaveToClass=\"hidden\"\n                    leaveActiveClass=\"animate-fadeout\"\n                    [hideOnOutsideClick]=\"true\"\n                >\n                <i class=\"pi pi-user\"></i>\n                </button>\n                <app-logout />\n            </div>\n        </div>\n    </div>"
        })
    ], AppTopbar);
    return AppTopbar;
}());
exports.AppTopbar = AppTopbar;

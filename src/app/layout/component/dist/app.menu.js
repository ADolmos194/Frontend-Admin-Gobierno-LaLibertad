"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppMenu = void 0;
var core_1 = require("@angular/core");
var app_menuitem_1 = require("./app.menuitem");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var AppMenu = /** @class */ (function () {
    function AppMenu(cookieService) {
        this.cookieService = cookieService;
        this.model = [];
    }
    AppMenu.prototype.ngOnInit = function () {
        var data = this.cookieService.get('userMenu');
        var menu = data ? JSON.parse(decodeURIComponent(data)) : [];
        this.model = menu;
    };
    AppMenu = __decorate([
        core_1.Component({
            selector: 'app-menu',
            standalone: true,
            imports: [common_1.CommonModule, router_1.RouterModule, app_menuitem_1.AppMenuitem],
            template: "\n    <ul class=\"layout-menu\">\n        <ng-container *ngFor=\"let item of model; let i = index\">\n            <li app-menuitem [item]=\"item\" [index]=\"i\" [root]=\"true\"></li>\n            <li *ngIf=\"item.separator\" class=\"menu-separator\"></li>\n        </ng-container>\n    </ul>"
        })
    ], AppMenu);
    return AppMenu;
}());
exports.AppMenu = AppMenu;

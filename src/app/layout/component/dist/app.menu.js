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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var app_menuitem_1 = require("./app.menuitem");
var AppMenu = /** @class */ (function () {
    function AppMenu() {
        this.model = [];
    }
    AppMenu.prototype.ngOnInit = function () {
        this.model = [
            {
                label: 'inicio',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: 'general',
                items: [
                    { label: 'Unidad Medida', icon: 'pi pi-fw pi-id-card', routerLink: ['/general/unidadmedida'] },
                    { label: 'Conversion Unidad Medida', icon: 'pi pi-fw pi-id-card', routerLink: ['/general/conversionunidadmedida'] },
                    { label: 'Mercado', icon: 'pi pi-fw pi-id-card', routerLink: ['/general/mercado'] },
                    { label: 'Pais', icon: 'pi pi-fw pi-id-card', routerLink: ['/general/pais'] },
                    { label: 'Departamento', icon: 'pi pi-fw pi-id-card', routerLink: ['/general/departamento'] },
                    { label: 'Provincia', icon: 'pi pi-fw pi-id-card', routerLink: ['/general/provincia'] },
                    { label: 'Distrito', icon: 'pi pi-fw pi-id-card', routerLink: ['/general/distrito'] },
                    { label: 'Localidad - Caserio', icon: 'pi pi-fw pi-id-card', routerLink: ['/general/localidadcaserio'] },
                ]
            },
            {
                label: 'categorias',
                items: [
                    { label: 'Tipo producto', icon: 'pi pi-fw pi-id-card', routerLink: ['/categorias/tipoproducto'] },
                    { label: 'Productos', icon: 'pi pi-fw pi-id-card', routerLink: ['/categorias/producto'] },
                ]
            },
            {
                label: 'registros precio',
                items: [
                    { label: 'Mercado Mayorista - Minorista', icon: 'pi pi-fw pi-id-card', routerLink: ['/registros/preciomercadomayoristaminorista'] },
                    { label: 'Ciudades', icon: 'pi pi-fw pi-id-card', routerLink: ['/registros/preciociudad'] },
                ]
            },
            {
                label: 'ofertas',
                items: [
                    { label: 'Ofertas Generales', icon: 'pi pi-fw pi-id-card', routerLink: ['/ofertas/frutas'] },
                ]
            },
            {
                label: 'demandas',
                items: [
                    { label: 'Demandas Generales', icon: 'pi pi-fw pi-id-card', routerLink: ['/demandas/demandaproductoagropecuario'] },
                ]
            },
        ];
    };
    AppMenu = __decorate([
        core_1.Component({
            selector: 'app-menu',
            standalone: true,
            imports: [common_1.CommonModule, app_menuitem_1.AppMenuitem, router_1.RouterModule],
            template: "<ul class=\"layout-menu\">\n        <ng-container *ngFor=\"let item of model; let i = index\">\n            <li app-menuitem *ngIf=\"!item.separator\" [item]=\"item\" [index]=\"i\" [root]=\"true\"></li>\n            <li *ngIf=\"item.separator\" class=\"menu-separator\"></li>\n        </ng-container>\n    </ul> "
        })
    ], AppMenu);
    return AppMenu;
}());
exports.AppMenu = AppMenu;

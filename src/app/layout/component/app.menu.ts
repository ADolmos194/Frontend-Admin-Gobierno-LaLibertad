import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
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
                    { label: 'Servicios Agropecuarios', icon: 'pi pi-fw pi-id-card', routerLink: ['/ofertas/servicioagrario'] },
                    { label: 'Productos lacteos', icon: 'pi pi-fw pi-id-card', routerLink: ['/ofertas/productoslacteos'] },
                    { label: 'Frutas', icon: 'pi pi-fw pi-id-card', routerLink: ['/ofertas/frutas'] },
                    { label: 'Insumo tecnologico', icon: 'pi pi-fw pi-id-card', routerLink: ['/ofertas/insumotecnologico'] },
                    { label: 'Cereales - Legumbres', icon: 'pi pi-fw pi-id-card', routerLink: ['/ofertas/cerealeslegumbres'] },
                    { label: 'Tuberculos - Raices', icon: 'pi pi-fw pi-id-card', routerLink: ['/ofertas/tuberculosraices'] },
                    { label: 'Pastos - Forrajes', icon: 'pi pi-fw pi-id-card', routerLink: ['/ofertas/pastosforrajes'] },
                ]
            },
            {
                label: 'demandas',
                items: [
                    { label: 'Productos Agropecuarios', icon: 'pi pi-fw pi-id-card', routerLink: ['/demandas/demandaproductoagropecuario'] },
                ]
            },
        ];
    }
}

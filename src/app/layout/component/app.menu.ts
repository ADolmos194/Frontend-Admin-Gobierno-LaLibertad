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
                label: 'ofertas',
                items: [
                    { label: 'Ofertas Generales', icon: 'pi pi-fw pi-id-card', routerLink: ['/ofertas/frutas'] },
                ]
            },
            {
                label: 'demandas',
                items: [
                    { label: 'Demandas Generales', icon: 'pi pi-fw pi-id-card', routerLink: ['/demandas/demandas'] },
                ]
            },
            {
                label: 'categorias',
                items: [{
                    label: 'Maestras',
                    icon: '',
                    items: [
                        { label: 'Tipo producto', icon: 'pi pi-fw pi-id-card', routerLink: ['/categorias/tipoproducto'] },
                        { label: 'Productos', icon: 'pi pi-fw pi-id-card', routerLink: ['/categorias/producto'] },
                    ]
                }
                ]
            },
            {
                label: 'Configuración',
                items: [{
                    label: 'Maestras',
                    icon: '',
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
                }
                ]
            }
        ];
    }
}

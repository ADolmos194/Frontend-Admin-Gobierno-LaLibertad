import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { AppMenuitem } from './app.menuitem';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, RouterModule, AppMenuitem],
    template: `
    <ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul>`
})
export class AppMenu implements OnInit {
    model: MenuItem[] = [];

    constructor(private cookieService: CookieService) {}

    ngOnInit() {
        const data = this.cookieService.get('userMenu');
        const menu = data ? JSON.parse(decodeURIComponent(data)) : [];
        this.model = menu;
    }
}

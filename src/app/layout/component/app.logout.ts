import { UsuarioSistemaService } from '@/apis_modelos/autenticacion/autenticacion_service/autenticacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
    standalone: true,
    selector: 'app-logout',
    imports: [ButtonModule],
    template: `
    <div class="pt-2 flex gap-2 flex-wrap justify-start">
        <div>
            <p class="text-lg font-semibold">{{ email }}</p>
        </div>
        <div>
            <p-button severity="info" label="Cerrar Sesión" (onClick)="logout()"></p-button>
        </div>
    </div>`,
    host: {
        class: 'hidden absolute top-[3.25rem] right-0 w-72 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]'
    }
})
export class AppLogout implements OnInit {
    email: string = 'Desconocido';
    private sub!: Subscription;

    constructor(
        private router: Router,
        private usuariosistemaService: UsuarioSistemaService,
        private cookie: CookieService
    ) { }

    getTokenExpiration(token: string): number | null {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp ? payload.exp * 1000 : null;
        } catch (e) {
            console.error('Token inválido', e);
            return null;
        }
    }

    ngOnInit() {
        const cookieData = this.cookie.get('userData');
        const accessToken = this.cookie.get('access_token');

        if (cookieData) {
            try {
                const user = JSON.parse(decodeURIComponent(cookieData));
                this.email = user.email || 'Desconocido';
            } catch (e) {
                console.error('Error al parsear userData', e);
            }
        }

        if (accessToken) {
            const exp = this.getTokenExpiration(accessToken);
            if (exp) {
                const now = Date.now();
                const timeout = exp - now;
                if (timeout > 0) {
                    setTimeout(() => {
                        this.logout();
                    }, timeout);
                } else {
                    this.logout(); // token ya expirado
                }
            } else {
                this.logout(); // no se pudo leer expiración
            }
        } else {
            this.logout(); // sin token
        }
    }

    logout() {
        this.cookie.delete('access_token', '/');
        this.cookie.delete('refresh_token', '/');
        this.cookie.delete('userData', '/');
        this.cookie.delete('userMenu', '/');

        this.usuariosistemaService.clearUsuario();
        this.router.navigate(['/auth/login']);
    }


    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}

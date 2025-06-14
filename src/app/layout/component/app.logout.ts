import { UsuarioSistemaService } from '@/apis_modelos/autenticacion/autenticacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-logout',
    imports: [ButtonModule],
    template: `
    <div class="pt-2 flex gap-2 flex-wrap justify-start">
        <div>
            <p class="text-lg font-semibold">Usuario: {{ usuario }}</p>
        </div>
        <div>
            <p-button severity="warn" label="Cerrar Sesión" (onClick)="logout()"></p-button>
        </div>
    </div>`,
    host: {
        class: 'hidden absolute top-[3.25rem] right-0 w-72 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]'
    }
})
export class AppLogout implements OnInit {
    usuario: string = 'Desconocido';
    private sub!: Subscription;

    constructor(private router: Router, private usuariosistemaService: UsuarioSistemaService) { }

    ngOnInit() {
        this.sub = this.usuariosistemaService.usuario$.subscribe(usuario => {
            this.usuario = usuario ?? localStorage.getItem('usuario') ?? 'Desconocido';
        });
    }

    logout() {
        this.usuariosistemaService.clearUsuario();
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('usuarioSistemaId');
        localStorage.removeItem('usuario');
        this.router.navigate(['/auth/login']);
    }




    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}

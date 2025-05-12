import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { UsuariosSistemaLogin } from '@/apis_modelos/autenticacion/autenticacionlogin.model';
import { UsuarioSistemaService } from '@/apis_modelos/autenticacion/autenticacion.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ToastModule, AppFloatingConfigurator, DividerModule],
    templateUrl: './login.components.html',
    providers: [MessageService, UsuarioSistemaService, ConfirmationService]
})
export class Login {
    isLoading: boolean = false;
    isLoadingCrearCuenta: boolean = false;
    enviar: boolean = false;
    usuariosistemalogin: UsuariosSistemaLogin = {
        usuario: '',
        password: '',
    };
    constructor(
        private usuariosistemaService: UsuarioSistemaService,
        private messageService: MessageService,
        private router: Router
    ) { }

    irACrearCuenta() {
        this.isLoadingCrearCuenta = true
        setTimeout(() => {
            this.router.navigate(['/auth/register']);
        }, 2000);
    }

    async guardarUsuarioSistema() {
        this.enviar = true;
        this.isLoading = true;
        try {
            const UsuarioSistemaParaEnviar = {
                usuario: this.usuariosistemalogin.usuario,
                password: this.usuariosistemalogin.password,
            };

            const response = await this.usuariosistemaService.verificarUsuarioSistema(UsuarioSistemaParaEnviar);

            if (response.status === "success") {
                this.usuariosistemaService.setUsuario(response.data.usuario);
            }



            this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: response.message_user || 'Inicio de sesión exitoso. Redirigiendo...'
            });

            setTimeout(() => {
                this.router.navigate(['/']);
            }, 3000);

        } catch (error: any) {
            const msg = error?.response?.data?.message_user || 'Error inesperado';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        } finally {
            this.isLoading = false;
        }
    }

}

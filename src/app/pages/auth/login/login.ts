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
import { UsuariosSistemaLogin } from '@/apis_modelos/autenticacion/autenticacion_service/autenticacionlogin.model';
import { UsuarioSistemaService } from '@/apis_modelos/autenticacion/autenticacion_service/autenticacion.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ToastModule, DividerModule, ProgressSpinnerModule],
    templateUrl: './login.components.html',
    providers: [MessageService, UsuarioSistemaService, ConfirmationService]
})
export class Login implements OnInit {
    isLoading = false;
    isLoadingButton: boolean = false;
    isLoadingCrearCuenta = false;
    enviar = false;

    usuariosistemalogin: UsuariosSistemaLogin = {
        usuario: '',
        password: '',
    };
    cookie1: any;

    constructor(
        private usuariosistemaService: UsuarioSistemaService,
        private messageService: MessageService,
        private router: Router,
        private cookie: CookieService   // 👈 agrega esto
    ) { }


    ngOnInit() {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
        }, 1500); // simula una carga de 1.5 segundos
    }


    irACrearCuenta() {
        this.isLoadingCrearCuenta = true;
        setTimeout(() => window.location.href = '/auth/register', 1500);
    }

    async guardarUsuarioSistema() {
        this.enviar = true;

        const { usuario, password } = this.usuariosistemalogin;
        if (!usuario || !password) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Campos requeridos',
                detail: 'Por favor complete usuario y contraseña.',
            });
            return;
        }

        this.isLoadingButton = true;

        try {
            const response = await this.usuariosistemaService.verificarUsuarioSistema({ usuario, password });

            if (response.status === 'success') {
                const { userData, menu } = response.data;

                // ✅ Guardar el menú en cookies desde el UsuarioSistemaService
                this.usuariosistemaService.guardarMenu(menu);

                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: response.message_user || 'Inicio de sesión exitoso.',
                });

                setTimeout(() => {
                    this.isLoadingButton = false;
                    this.router.navigate(['/']);
                }, 2000);
            }


        } catch (error: any) {
            const msg = error?.response?.data?.message_user || 'Error inesperado';
            this.messageService.add({
                severity: 'error',
                summary: 'Error al iniciar sesión',
                detail: msg,
            });
        } finally {
            this.isLoadingButton = false;
        }
    }


}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { UsuariosSistemasRegister } from '@/apis_modelos/autenticacion/autenticacionregister.model';
import { UsuarioSistemaService } from '@/apis_modelos/autenticacion/autenticacion.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ToastModule, AppFloatingConfigurator, InputGroupModule, InputGroupAddonModule, DividerModule],
    templateUrl: './register.components.html',
    providers: [MessageService, UsuarioSistemaService, ConfirmationService, Router]
})
export class Register {
    isLoading: boolean = false;
    enviar: boolean = false;
    usuariosistemaregister: UsuariosSistemasRegister = {
        id: 0,
        nombre:'',
        apellido:'',
        usuario: '',
        password: '',
        email:'',
        estado_id: 1,
        fecha_creacion:'',
        fecha_modificacion:''
    };
    constructor(
        private usuariosistemaService: UsuarioSistemaService,
        private messageService: MessageService,
        private router: Router
    ) { }

    irAlLogin() {
        setTimeout(() => {
            this.router.navigate(['/auth/login']);
        }, 2000);
    }


    async guardarUsuarioSistema() {
        this.enviar = true;
        this.isLoading = true;
        try {
            const UsuarioSistemaParaEnviar = {
                id: this.usuariosistemaregister.id,
                nombre: this.usuariosistemaregister.nombre,
                apeliido: this.usuariosistemaregister.apellido,
                usuario: this.usuariosistemaregister.usuario,
                password: this.usuariosistemaregister.password,
                email: this.usuariosistemaregister.email,
                estado: this.usuariosistemaregister.estado_id
            };

            const response = await this.usuariosistemaService.createUsuarioSistema(UsuarioSistemaParaEnviar);

            if (response.status === 'success') {
                localStorage.setItem('usuario', UsuarioSistemaParaEnviar.usuario);
            }


            this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: response.message_user || 'Inicio de sesión exitoso. Redirigiendo...'
            });

            setTimeout(() => {
                this.router.navigate(['/auth/login']);
            }, 2000);

        } catch (error: any) {
            const msg = error?.response?.data?.message_user || 'Error inesperado';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        } finally {
            this.isLoading = false;
        }
    }
}

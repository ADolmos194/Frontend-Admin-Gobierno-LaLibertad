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
import { SelectModule } from 'primeng/select';
import { UsuariosSistemasRegister } from '@/apis_modelos/autenticacion/autenticacion_service/autenticacionregister.model';
import { UsuarioSistemaService } from '@/apis_modelos/autenticacion/autenticacion_service/autenticacion.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { ProvinciasActivas } from '@/apis_modelos/general/provincia_service/provinciasactivas.model';
import { ProvinciaService } from '@/apis_modelos/general/provincia_service/provincia.service';
import { DistritoService } from '@/apis_modelos/general/distrito_servcie/distrito.service';
import { DistritosActivos } from '@/apis_modelos/general/distrito_servcie/distritosactivos.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ButtonModule, ProgressSpinnerModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ToastModule, InputGroupModule, InputGroupAddonModule, DividerModule, SelectModule],
    templateUrl: './register.components.html',
    providers: [MessageService, UsuarioSistemaService, ConfirmationService, Router]
})
export class Register {
    isLoading: boolean = false;
    isLoadingButton: boolean = false;
    enviar: boolean = false;
    usuariosistemaregister: UsuariosSistemasRegister = {
        id: 0,
        nombrecompleto: '',
        usuario: '',
        password: '',
        email: '',
        tipodocumento: 'DNI',
        numerodocumento: '',
        numero_celular: '',
        numero_telefono: '',
        distrito_id: 0,
        direccion: '',
        terminos_condiciones: false,
        estado_id: 1,
    };
    constructor(
        private usuariosistemaService: UsuarioSistemaService,
        private provinciaService: ProvinciaService,
        private distritoService: DistritoService,
        private messageService: MessageService,
        private router: Router
    ) { }

    opcionesProvinciaActivas: ProvinciasActivas[] = [];
    opcionesDistritoActivos: DistritosActivos[] = [];

    tipodocuemtoselccionado = [
        { id:'DNI', nombre: 'DNI' },
        { id:'Carnet de Extranjería', nombre: 'Carnet de Extranjería' },
        { id:'Pasaporte', nombre: 'Pasaporte' },
        { id:'RUC', nombre: 'RUC' }
    ]

    irAlLogin() {
        setTimeout(() => { this.isLoading = false; window.location.href = '/auth/login'}, 2000);
    }

    async cargarOpciones(service: () => Promise<any>, opcionesRef: any[], label: string) {
        try {
            const response = await service();
            opcionesRef.length = 0;
            response.forEach((item: any) => {
                opcionesRef.push({
                    id: item.id,
                    nombre: item.nombre
                });
            });
        } catch (error) {
            console.error(`Error al cargar ${label}:`, error);
        }
    }

    async ngOnInit() {
        this.isLoading = true;
        try {

            await this.cargarOpciones(
                this.provinciaService.getProvinciasActivas.bind(this.provinciaService),
                this.opcionesProvinciaActivas,
                'provincia activas'
            );

            await this.cargarOpciones(
                this.distritoService.getDistritosActivos.bind(this.distritoService),
                this.opcionesDistritoActivos,
                'distrito activos'
            );

        } catch (error) {
            console.error('Error al cargar datos iniciales:', error);
        } finally {
            this.isLoading = false;
        }
    }




 async guardarUsuarioSistema() {
    this.enviar = true;

    // Lista de campos y etiquetas legibles
    const campos = [
        { key: 'email', label: 'Email' },
        { key: 'usuario', label: 'Usuario' },
        { key: 'password', label: 'Contraseña' },
        { key: 'nombrecompleto', label: 'Nombre completo' },
        { key: 'tipodocumento', label: 'Tipo de documento' },
        { key: 'numerodocumento', label: 'Número de documento' },
        { key: 'numero_celular', label: 'Número de celular' },
        { key: 'distrito_id', label: 'Distrito' }
    ];

    // Buscar campos vacíos
    const camposFaltantes = campos.filter(campo => !this.usuariosistemaregister[campo.key]);

    if (camposFaltantes.length > 0) {
        // Mostrar mensaje específico del primer campo vacío
        this.messageService.add({
            severity: 'warn',
            summary: 'Campo requerido',
            detail: `El campo ${camposFaltantes[0].label} es requerido.`
        });

        // Si hay más de uno, agregar mensaje general
        if (camposFaltantes.length > 1) {
            this.messageService.add({
                severity: 'info',
                summary: 'Completa el formulario',
                detail: 'Por favor completa todos los campos obligatorios.'
            });
        }
        return;
    }

    this.isLoadingButton = true;

    try {
        const UsuarioSistemaParaEnviar = {
            id: this.usuariosistemaregister.id,
            nombrecompleto: this.usuariosistemaregister.nombrecompleto,
            usuario: this.usuariosistemaregister.usuario,
            password: this.usuariosistemaregister.password,
            email: this.usuariosistemaregister.email,
            tipodocumento: this.usuariosistemaregister.tipodocumento,
            numerodocumento: this.usuariosistemaregister.numerodocumento,
            numero_celular: this.usuariosistemaregister.numero_celular,
            numero_telefono: this.usuariosistemaregister.numero_telefono,
            distrito: this.usuariosistemaregister.distrito_id,
            direccion: this.usuariosistemaregister.direccion,
            terminos_condiciones: this.usuariosistemaregister.terminos_condiciones,
            estado: this.usuariosistemaregister.estado_id,
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
            this.isLoadingButton = false;
            window.location.href = '/auth/login';
        }, 1500);

    } catch (error: any) {
        const msg = error?.response?.data?.message_user || 'Error inesperado';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
    } finally {
        this.isLoadingButton = false;
    }
}

}

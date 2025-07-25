import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Paises } from '@/apis_modelos/general/pais_service/pais.model';
import { PaisService } from '@/apis_modelos/general/pais_service/pais.service';
import { Estado } from '@/apis_modelos/general/estado_service/estado.model';
import { CheckboxModule } from 'primeng/checkbox';
import { EstadoService } from '@/apis_modelos/general/estado_service/estado.service';
import { DrawerModule } from 'primeng/drawer';
import { Skeleton } from 'primeng/skeleton';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-paises',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        DrawerModule,
        FormsModule,
        ButtonModule,
        CheckboxModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        Skeleton
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './pais.components.html',
    providers: [MessageService, PaisService, ConfirmationService]
})
export class Pais implements OnInit {
    paisDialogo: boolean = false;
    paises = signal<Paises[]>([]);
    pais: Paises = {
        id: 0,
        nombre: '',
        estado_id: 1,
        fecha_creacion: '',
        fecha_modificacion: ''
    };
    seleccionarPaises!: Paises[] | null;
    enviar: boolean = false;
    isLoading: boolean = false;
    cols: { field: string; header: string }[] = [];
    accion: number = 1;
    opcionesEstado: Estado[] = [];

    skeletonRows = Array(8).fill({});

    estado = [
        { label: 'ACTIVO', value: 1 },
        { label: 'INACTIVO', value: 2 }
    ];

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    constructor(
        private paisService: PaisService,
        private messageService: MessageService,
        private estadoService: EstadoService,
        private confirmationService: ConfirmationService
    ) { }

    async cargarPaises() {
        this.isLoading = true;
        try {
            const response: Paises[] = await this.paisService.getPaises();
            this.paises.set(response);
        } catch (error) {
            console.error('Error al cargar los paises', error);
        }
    }


    async cargarOpciones(service: () => Promise<any>, opcionesRef: Estado[], label: string) {
        try {
            const response = await service();
            opcionesRef.length = 0;
            response.forEach((item: Estado) => {
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
        this.cols = [
            { field: 'nombre', header: 'País' },
            { field: 'estado_id', header: 'Estado' },
            { field: 'fecha_creacion', header: 'Fecha creación' },
            { field: 'fecha_modificacion', header: 'Fecha modificación' }
        ];
        try {
            await Promise.all([this.cargarOpciones(this.estadoService.getEstado.bind(this.estadoService), this.opcionesEstado, 'estado')]);
            await this.cargarPaises();
        } catch (error) {
            console.error('Error al cargar los país:', error);
        } finally {
            this.isLoading = false;
        }
    }

    abrirNuevo() {
        this.accion = 1;
        this.enviar = false;
        this.limpiarDatos();
        this.paisDialogo = true;
    }

    limpiarDatos() {
        this.pais = {
            id: 0,
            nombre: '',
            estado_id: 1,
            fecha_creacion: '',
            fecha_modificacion: ''
        };
    }

    ocultarDialogo() {
        this.paisDialogo = false;
        this.enviar = false;
    }

    async guardarPais() {
        this.enviar = true;

        this.isLoading = true;
        try {

            const PaisParaEnviar = {
                id: this.pais.id,
                nombre: this.pais.nombre,
                estado: this.pais.estado_id,
                fecha_creacion: this.pais.fecha_creacion,
                fecha_modificacion: this.pais.fecha_modificacion
            };

            const response = this.accion === 1
                ? await this.paisService.createPais(PaisParaEnviar)
                : await this.paisService.updatePais(this.pais.id, PaisParaEnviar);

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user || 'Operación exitosa' });
            await this.cargarPaises();
            this.ocultarDialogo();
        } catch (error: any) {
            const msg = error?.response?.data?.message_user || 'Error inesperado';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        } finally {
            this.isLoading = false;
        }
    }

    getEstado(estado_id: number): string {
        switch (estado_id) {
            case 1:
                return 'ACTIVO';
            case 2:
                return 'INACTIVO';
            default:
                return 'ELIMINADO';
        }
    }

    getEstadoSeverity(estado_id: number): 'success' | 'danger' | 'info' {
        switch (estado_id) {
            case 1:
                return 'success';
            case 2:
                return 'danger';
            default:
                return 'info';
        }
    }

    editarPais(pais: Paises) {
        this.pais = { ...pais };
        this.accion = 2;
        this.paisDialogo = true;
    }

    async eliminarPais(pais: Paises) {
        this.confirmationService.confirm({
            message: `¿Estás seguro de que deseas eliminar el país "${pais.nombre}"?`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-secondary',
            accept: async () => {
                this.isLoading = true;
                try {
                    const response = await this.paisService.deletePais(pais.id);
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user });
                    await this.cargarPaises();
                } catch (error: any) {
                    const msg = error?.response?.data?.message_user || 'Error inesperado';
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
                } finally {
                    this.isLoading = false;
                }
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'No se eliminó el país' });
            }
        });
    }

}

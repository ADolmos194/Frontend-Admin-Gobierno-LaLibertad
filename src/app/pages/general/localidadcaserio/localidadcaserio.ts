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
import { Estado } from '@/apis_modelos/general/estado_service/estado.model';
import { CheckboxModule } from 'primeng/checkbox';
import { EstadoService } from '@/apis_modelos/general/estado_service/estado.service';
import { DrawerModule } from 'primeng/drawer';
import { Skeleton } from 'primeng/skeleton';
import { DistritosActivos } from '@/apis_modelos/general/distrito_servcie/distritosactivos.model';
import { DistritoService } from '@/apis_modelos/general/distrito_servcie/distrito.service';
import { LocalidadesCaserios } from '@/apis_modelos/general/localidadcaserio_service/localidadcaserio.model';
import { LocalidadCaserioService } from '@/apis_modelos/general/localidadcaserio_service/localidadcaserio.service';

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
    selector: 'app-localidadcaserio',
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
    templateUrl: './localidadcaserio.components.html',
    providers: [MessageService, LocalidadCaserioService, ConfirmationService]
})
export class LocalidadCaserio implements OnInit {
    localidadcaserioDialogo: boolean = false;
    localidadescaserios = signal<LocalidadesCaserios[]>([]);
    localidadcaserio: LocalidadesCaserios = {
        id: 0,
        nombre: '',
        distrito_id: 0,
        nombre_distrito: '',
        estado_id: 1,
        fecha_creacion: '',
        fecha_modificacion: ''
    };
    seleccionarLocalidadesCaserios!: LocalidadesCaserios[] | null;
    enviar: boolean = false;
    isLoading: boolean = false;
    cols: { field: string; header: string }[] = [];
    accion: number = 1;
    opcionesEstado: Estado[] = [];
    opcionesDistritosActivos: DistritosActivos[] = [];

    skeletonRows = Array(8).fill({});

    estado = [
        { label: 'ACTIVO', value: 1 },
        { label: 'INACTIVO', value: 2 }
    ];

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    constructor(
        private localidadcaserioService: LocalidadCaserioService,
        private distritoService: DistritoService,
        private messageService: MessageService,
        private estadoService: EstadoService,
        private confirmationService: ConfirmationService
    ) { }

    async cargarLocalidadCaserio() {
        this.isLoading = true;
        try {
            const response: LocalidadesCaserios[] = await this.localidadcaserioService.getLocalidadesCaserios();
            this.localidadescaserios.set(response);
        } catch (error) {
            console.error('Error al cargar las localidades - caserios', error);
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
            { field: 'nombre', header: 'Localidad - Caserio' },
            { field: 'nombre_distrito', header: 'Distrito' },
            { field: 'estado_id', header: 'Estado' },
            { field: 'fecha_creacion', header: 'Fecha creación' },
            { field: 'fecha_modificacion', header: 'Fecha modificación' }
        ];
        try {
            await Promise.all([this.cargarOpciones(this.distritoService.getDistritosActivos.bind(this.distritoService), this.opcionesDistritosActivos, 'distritos activas')]);
            await Promise.all([this.cargarOpciones(this.estadoService.getEstado.bind(this.estadoService), this.opcionesEstado, 'estado')]);
            await this.cargarLocalidadCaserio();
        } catch (error) {
            console.error('Error al cargar los localidad - caserio:', error);
        } finally {
            this.isLoading = false;
        }
    }

    abrirNuevo() {
        this.accion = 1;
        this.enviar = false;
        this.limpiarDatos();
        this.localidadcaserioDialogo = true;
    }

    limpiarDatos() {
        this.localidadcaserio = {
            id: 0,
            nombre: '',
            distrito_id: 0,
            nombre_distrito: '',
            estado_id: 1,
            fecha_creacion: '',
            fecha_modificacion: ''
        };
    }

    ocultarDialogo() {
        this.localidadcaserioDialogo = false;
        this.enviar = false;
    }

    async guardarLocalidadCaserio() {
        this.enviar = true;

        this.isLoading = true;
        try {

            const LocalidadCaserioParaEnviar = {
                id: this.localidadcaserio.id,
                nombre: this.localidadcaserio.nombre,
                distrito: this.localidadcaserio.distrito_id,
                estado: this.localidadcaserio.estado_id,
                fecha_creacion: this.localidadcaserio.fecha_creacion,
                fecha_modificacion: this.localidadcaserio.fecha_modificacion
            };

            const response = this.accion === 1
                ? await this.localidadcaserioService.createLocalidadCaserio(LocalidadCaserioParaEnviar)
                : await this.localidadcaserioService.updateLocalidadCaserio(this.localidadcaserio.id, LocalidadCaserioParaEnviar);

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user || 'Operación exitosa' });
            await this.cargarLocalidadCaserio();
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

    editarLocalidadCaserio(localidadcaserio: LocalidadesCaserios) {
        this.localidadcaserio = { ...localidadcaserio };
        this.accion = 2;
        this.localidadcaserioDialogo = true;
    }

    async eliminarLocalidadCaserio(localidadcaserio: LocalidadesCaserios) {
        this.confirmationService.confirm({
            message: `¿Estás seguro de que deseas eliminar la localidadcaserio"${localidadcaserio.nombre}"?`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-secondary',
            accept: async () => {
                this.isLoading = true;
                try {
                    const response = await this.localidadcaserioService.deleteLocalidadCaserio(localidadcaserio.id);
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user });
                    await this.cargarLocalidadCaserio();
                } catch (error: any) {
                    const msg = error?.response?.data?.message_user || 'Error inesperado';
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
                } finally {
                    this.isLoading = false;
                }
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'No se eliminó la localidadcaserio' });
            }
        });
    }
}


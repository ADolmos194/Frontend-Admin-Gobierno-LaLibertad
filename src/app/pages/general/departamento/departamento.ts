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
import { Departamentos } from '@/apis_modelos/general/departamento_service/departamento.model';
import { DepartamentoService } from '@/apis_modelos/general/departamento_service/departamento.service';
import { Estado } from '@/apis_modelos/general/estado_service/estado.model';
import { CheckboxModule } from 'primeng/checkbox';
import { EstadoService } from '@/apis_modelos/general/estado_service/estado.service';
import { DrawerModule } from 'primeng/drawer';
import { Skeleton } from 'primeng/skeleton';
import { PaisesActivos } from '@/apis_modelos/general/pais_service/paisesactivos.model';
import { PaisService } from '@/apis_modelos/general/pais_service/pais.service';

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
    selector: 'app-departamentos',
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
    templateUrl: './departamento.components.html',
    providers: [MessageService, DepartamentoService, ConfirmationService]
})
export class Departamento implements OnInit {
    departamentoDialogo: boolean = false;
    departamentos = signal<Departamentos[]>([]);
    departamento: Departamentos = {
        id: 0,
        nombre: '',
        pais_id: 0,
        nombre_pais: '',
        estado_id: 1,
        fecha_creacion: '',
        fecha_modificacion: ''
    };
    seleccionarDepartamentos!: Departamentos[] | null;
    enviar: boolean = false;
    isLoading: boolean = false;
    cols: { field: string; header: string }[] = [];
    accion: number = 1;
    opcionesEstado: Estado[] = [];
    opcionesPaisesActivos: PaisesActivos[] = [];

    skeletonRows = Array(8).fill({});

    estado = [
        { label: 'ACTIVO', value: 1 },
        { label: 'INACTIVO', value: 2 }
    ];

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    constructor(
        private departamentoService: DepartamentoService,
        private paisService: PaisService,
        private messageService: MessageService,
        private estadoService: EstadoService,
    ) { }

    async cargarDepartamentos() {
        this.isLoading = true;
        try {
            const response: Departamentos[] = await this.departamentoService.getDepartamentos();
            this.departamentos.set(response);
        } catch (error) {
            console.error('Error al cargar los departamentos', error);
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
            { field: 'nombre', header: 'Departamento' },
            { field: 'nombre_pais', header: 'País' },
            { field: 'estado_id', header: 'Estado' },
            { field: 'fecha_creacion', header: 'Fecha creación' },
            { field: 'fecha_modificacion', header: 'Fecha modificación' }
        ];
        try {
            await Promise.all([this.cargarOpciones(this.paisService.getPaisesActivos.bind(this.paisService), this.opcionesPaisesActivos, 'paises activos')]);
            await Promise.all([this.cargarOpciones(this.estadoService.getEstado.bind(this.estadoService), this.opcionesEstado, 'estado')]);
            await this.cargarDepartamentos();
        } catch (error) {
            console.error('Error al cargar los departamentos:', error);
        } finally {
            this.isLoading = false;
        }
    }

    abrirNuevo() {
        this.accion = 1;
        this.enviar = false;
        this.limpiarDatos();
        this.departamentoDialogo = true;
    }

    limpiarDatos() {
        this.departamento = {
            id: 0,
            nombre: '',
            pais_id: 0,
            nombre_pais: '',
            estado_id: 1,
            fecha_creacion: '',
            fecha_modificacion: ''
        };
    }

    ocultarDialogo() {
        this.departamentoDialogo = false;
        this.enviar = false;
    }

    async guardarDepartamento() {
        this.enviar = true;

        this.isLoading = true;
        try {

            const DepartamentoParaEnviar = {
                id: this.departamento.id,
                nombre: this.departamento.nombre,
                pais: this.departamento.pais_id,
                estado: this.departamento.estado_id,
                fecha_creacion: this.departamento.fecha_creacion,
                fecha_modificacion: this.departamento.fecha_modificacion
            };

            const response = this.accion === 1
                ? await this.departamentoService.createDepartamento(DepartamentoParaEnviar)
                : await this.departamentoService.updateDepartamento(this.departamento.id, DepartamentoParaEnviar);

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user || 'Operación exitosa' });
            await this.cargarDepartamentos();
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

    editarDepartamento(departamento: Departamentos) {
        this.departamento = { ...departamento };
        this.accion = 2;
        this.departamentoDialogo = true;
    }

    async eliminarDepartamento(departamento: Departamentos) {
        const id = departamento.id;
        this.isLoading = true;
        try {
            const response = await this.departamentoService.deleteDepartamento(id);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user });
            await this.cargarDepartamentos();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Error inesperado';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
        } finally {
            this.isLoading = false;
        }
    }
}


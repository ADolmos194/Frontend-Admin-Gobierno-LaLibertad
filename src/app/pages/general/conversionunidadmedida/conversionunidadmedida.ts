
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
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
import { ConversionesUnidadesMedidas } from '@/apis_modelos/general/conversionunidadmedida_service/conversionunidadmedida.model';
import { ConversionUnidadMedidaService } from '@/apis_modelos/general/conversionunidadmedida_service/conversionunidadmedida.service';
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
    selector: 'app-conversionunidadmedida',
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
    templateUrl: './conversionunidadmedida.components.html',
    providers: [MessageService, ConversionUnidadMedidaService, ConfirmationService]
})
export class Conversionunidadmedida implements OnInit {
    conversionunidadmedidaDialogo: boolean = false;
    conversionesunidadesmedidas = signal<ConversionesUnidadesMedidas[]>([]);
    conversionunidadmedida: ConversionesUnidadesMedidas = {
        id: 0,
        nombre: '',
        estado_id: 1,
        fecha_creacion: '',
        fecha_modificacion: ''
    };
    seleccionarConversionunidadmedida!: ConversionesUnidadesMedidas[] | null;
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
        private conversionunidadmedidaService: ConversionUnidadMedidaService,
        private messageService: MessageService,
        private estadoService: EstadoService,
        private confirmationService: ConfirmationService
    ) {}

    async cargarConversionesUnidadesMedidas() {
        this.isLoading = true;
        try {
            const response: ConversionesUnidadesMedidas[] = await this.conversionunidadmedidaService.getConversionesUnidadesMedidas();
            this.conversionesunidadesmedidas.set(response);
        } catch (error) {
            console.error('Error al cargar los Conversiones Unidades Medidas', error);
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
            { field: 'nombre', header: 'Conversión de U.Medida' },
            { field: 'estado_id', header: 'Estado' },
            { field: 'fecha_creacion', header: 'Fecha creación' },
            { field: 'fecha_modificacion', header: 'Fecha modificación' }
        ];
        try {
            await Promise.all([this.cargarOpciones(this.estadoService.getEstado.bind(this.estadoService), this.opcionesEstado, 'estado')]);
            await this.cargarConversionesUnidadesMedidas();
        } catch (error) {
            console.error('Error al cargar las Conversiones Unidades Medidas:', error);
        } finally {
            this.isLoading = false;
        }
    }

    abrirNuevo() {
        this.accion = 1;
        this.enviar = false;
        this.limpiarDatos();
        this.conversionunidadmedidaDialogo = true;
    }

    limpiarDatos() {
        this.conversionunidadmedida = {
            id: 0,
            nombre: '',
            estado_id: 1,
            fecha_creacion: '',
            fecha_modificacion: ''
        };
    }

    ocultarDialogo() {
        this.conversionunidadmedidaDialogo = false;
        this.enviar = false;
    }

    async guardarConversionesUnidadesMedidas() {
        this.enviar = true;

        this.isLoading = true;
        try {

            const ConversionesUnidadesMedidasParaEnviar = {
                id: this.conversionunidadmedida.id,
                nombre: this.conversionunidadmedida.nombre,
                estado: this.conversionunidadmedida.estado_id,
                fecha_creacion: this.conversionunidadmedida.fecha_creacion,
                fecha_modificacion: this.conversionunidadmedida.fecha_modificacion
            };

            const response = this.accion === 1
                ? await this.conversionunidadmedidaService.createConversionUnidadMedida(ConversionesUnidadesMedidasParaEnviar)
                : await this.conversionunidadmedidaService.updateConversionUnidadMedida(this.conversionunidadmedida.id, ConversionesUnidadesMedidasParaEnviar);

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user || 'Operación exitosa' });
            await this.cargarConversionesUnidadesMedidas();
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

    editarConversionUnidadMedida(conversionunidadmedida: ConversionesUnidadesMedidas) {
        this.conversionunidadmedida = { ...conversionunidadmedida };
        this.accion = 2;
        this.conversionunidadmedidaDialogo = true;
    }

    async eliminarConversionUnidadMedida(conversionunidadmedida: ConversionesUnidadesMedidas) {
        this.confirmationService.confirm({
            message: `¿Estás seguro de que deseas eliminar la conversión de unidad de medida "${conversionunidadmedida.nombre}"?`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-secondary',
            accept: async () => {
                this.isLoading = true;
                try {
                    const response = await this.conversionunidadmedidaService.deleteConversionUnidadMedida(conversionunidadmedida.id);
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user });
                    await this.cargarConversionesUnidadesMedidas();
                } catch (error: any) {
                    const msg = error?.response?.data?.message_user || 'Error inesperado';
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
                } finally {
                    this.isLoading = false;
                }
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'No se eliminó la conversión de unidad de medida' });
            }
        });
    }

}

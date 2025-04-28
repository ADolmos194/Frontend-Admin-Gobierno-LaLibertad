
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
import { PreciosCiudades } from '@/apis_modelos/registros/preciociudad/preciociudad.model';
import { PreciosCiudadesService } from '@/apis_modelos/registros/preciociudad/preciociudad.service';
import { Estado } from '@/apis_modelos/general/estado_service/estado.model';
import { CheckboxModule } from 'primeng/checkbox';
import { EstadoService } from '@/apis_modelos/general/estado_service/estado.service';
import { DrawerModule } from 'primeng/drawer';
import { Skeleton } from 'primeng/skeleton';
import { ProductoService } from '@/apis_modelos/categorias/producto_service/producto.service';
import { ConversionesUnidadesMedidasActivos } from '@/apis_modelos/general/conversionunidadmedida_service/conversionunidadmedidaactivos.model';
import { ConversionUnidadMedidaService } from '@/apis_modelos/general/conversionunidadmedida_service/conversionunidadmedida.service';

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
    selector: 'app-preciosciudades',
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
    templateUrl: './preciociudad.components.html',
    providers: [MessageService, PreciosCiudadesService, ConfirmationService]
})
export class PrecioCiudad implements OnInit {
    preciociudadDialogo: boolean = false;
    preciosciudades = signal<PreciosCiudades[]>([]);
    preciociudad: PreciosCiudades = {
        id: 0,
        codigo: '',
        serie: '',
        producto_id: 0,
        nombre_producto: '',
        conversionunidadmedida_id: 0,
        nombre_conversionunidadmedida: '',
        valor_anual: 0,
        valor_enero: 0,
        valor_febrero: 0,
        valor_marzo: 0,
        valor_abril: 0,
        valor_mayo: 0,
        valor_junio: 0,
        valor_julio: 0,
        valor_agosto: 0,
        valor_septiembre: 0,
        valor_octubre: 0,
        valor_noviembre: 0,
        valor_diciembre: 0,
        estado_id: 1,
        fecha_creacion: '',
        fecha_modificacion: ''
    };
    seleccionarPreciosCiudades!: PreciosCiudades[] | null;
    enviar: boolean = false;
    isLoading: boolean = false;
    cols: { field: string; header: string }[] = [];
    accion: number = 1;
    opcionesEstado: Estado[] = [];
    opcionesProductoActivo: Estado[] = [];
    opcionesConversionUnidadMedidaActiva: ConversionesUnidadesMedidasActivos[] = [];

    skeletonRows = Array(8).fill({});

    estado = [
        { label: 'ACTIVO', value: 1 },
        { label: 'INACTIVO', value: 2 }
    ];

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    constructor(
        private preciociudadService: PreciosCiudadesService,
        private messageService: MessageService,
        private poroductoservice: ProductoService,
        private estadoService: EstadoService,
        private conversionunidadmedidaservice: ConversionUnidadMedidaService,
    ) { }

    async cargarPreciosCiudades() {
        this.isLoading = true;
        try {
            const response: PreciosCiudades[] = await this.preciociudadService.getPreciosCiudades();
            this.preciosciudades.set(response);
        } catch (error) {
            console.error('Error al cargar los precios ciudades', error);
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
            { field: 'codigo_serie', header: 'Codigo - Serie ' },
            { field: 'nombre_producto', header: 'Nombre producto' },
            { field: 'nombre_conversionunidadmedida', header: 'Unidad medida' },
            { field: 'valor_anual', header: 'Valor anual' },
            { field: 'estado_id', header: 'Estado' },
            { field: 'fecha_creacion', header: 'Fecha creación' },
            { field: 'fecha_modificacion', header: 'Fecha modificación' }
        ];
        try {
            await Promise.all([this.cargarOpciones(this.poroductoservice.getProductos.bind(this.poroductoservice), this.opcionesProductoActivo, 'producto activo')]);
            await Promise.all([this.cargarOpciones(this.conversionunidadmedidaservice.getConversionesUnidadesMedidas.bind(this.conversionunidadmedidaservice), this.opcionesConversionUnidadMedidaActiva, 'conversion unidad medida activa')]);
            await Promise.all([this.cargarOpciones(this.estadoService.getEstado.bind(this.estadoService), this.opcionesEstado, 'estado')]);
            await this.cargarPreciosCiudades();
        } catch (error) {
            console.error('Error al cargar los precio ciudades:', error);
        } finally {
            this.isLoading = false;
        }
    }

    abrirNuevo() {
        this.accion = 1;
        this.enviar = false;
        this.limpiarDatos();
        this.preciociudadDialogo = true;
    }

    limpiarDatos() {
        this.preciociudad = {
            id: 0,
            codigo: '',
            serie: '',
            producto_id: 0,
            nombre_producto: '',
            conversionunidadmedida_id: 0,
            nombre_conversionunidadmedida: '',
            valor_anual: 0,
            valor_enero: 0,
            valor_febrero: 0,
            valor_marzo: 0,
            valor_abril: 0,
            valor_mayo: 0,
            valor_junio: 0,
            valor_julio: 0,
            valor_agosto: 0,
            valor_septiembre: 0,
            valor_octubre: 0,
            valor_noviembre: 0,
            valor_diciembre: 0,
            estado_id: 1,
            fecha_creacion: '',
            fecha_modificacion: ''
        };
    }

    ocultarDialogo() {
        this.preciociudadDialogo = false;
        this.enviar = false;
    }

    async guardarPrecioCiudad() {
        this.enviar = true;

        this.isLoading = true;
        try {

            const PrecioCiudadParaEnviar = {
                id: this.preciociudad.id,
                codigo: this.preciociudad.codigo,
                serie: this.preciociudad.serie,
                producto: this.preciociudad.producto_id,
                conversionunidadmedida: this.preciociudad.conversionunidadmedida_id,
                valor_anual: this.preciociudad.valor_anual,
                valor_enero: this.preciociudad.valor_enero,
                valor_febrero: this.preciociudad.valor_febrero,
                valor_marzo: this.preciociudad.valor_marzo,
                valor_abril: this.preciociudad.valor_abril,
                valor_mayo: this.preciociudad.valor_mayo,
                valor_junio: this.preciociudad.valor_junio,
                valor_julio: this.preciociudad.valor_julio,
                valor_agosto: this.preciociudad.valor_agosto,
                valor_septiembre: this.preciociudad.valor_septiembre,
                valor_octubre: this.preciociudad.valor_octubre,
                valor_noviembre: this.preciociudad.valor_noviembre,
                valor_diciembre: this.preciociudad.valor_diciembre,
                estado: this.preciociudad.estado_id,
                fecha_creacion: this.preciociudad.fecha_creacion,
                fecha_modificacion: this.preciociudad.fecha_modificacion
            };

            const response = this.accion === 1
                ? await this.preciociudadService.createPreciosCiudades(PrecioCiudadParaEnviar)
                : await this.preciociudadService.updatePreciosCiudades(this.preciociudad.id, PrecioCiudadParaEnviar);

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user || 'Operación exitosa' });
            await this.cargarPreciosCiudades();
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

    editarPrecioCiudad(preciociudad: PreciosCiudades) {
        this.preciociudad = { ...preciociudad };
        this.accion = 2;
        this.preciociudadDialogo = true;
    }

    async eliminarPrecioCiudad(preciociudad: PreciosCiudades) {
        const id = preciociudad.id;
        this.isLoading = true;
        try {
            const response = await this.preciociudadService.deletePreciosCiudades(id);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user });
            await this.cargarPreciosCiudades();
        } catch (error: any) {
            const msg = error?.response?.data?.message_user || 'Error inesperado';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        } finally {
            this.isLoading = false;
        }
    }
}


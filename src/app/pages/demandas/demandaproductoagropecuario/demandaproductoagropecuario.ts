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
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DemandaProductosAgropecuarios } from '@/apis_modelos/demandas/demandaproductosagropecuarios.model';
import { DemandaProductosAgropecuariosService } from '@/apis_modelos/demandas/demandaproductosagropecuarios.service';
import { Estado } from '@/apis_modelos/general/estado_service/estado.model';
import { CheckboxModule } from 'primeng/checkbox';
import { EstadoService } from '@/apis_modelos/general/estado_service/estado.service';
import { DrawerModule } from 'primeng/drawer';
import { Skeleton } from 'primeng/skeleton';
import { ProductosActivos } from '@/apis_modelos/categorias/producto_service/productoactivo.model';
import { ProductoService } from '@/apis_modelos/categorias/producto_service/producto.service';
import { DistritosActivos } from '@/apis_modelos/general/distrito_servcie/distritosactivos.model';
import { DistritoService } from '@/apis_modelos/general/distrito_servcie/distrito.service';
import { ProvinciasActivas } from '@/apis_modelos/general/provincia_service/provinciasactivas.model';
import { ProvinciaService } from '@/apis_modelos/general/provincia_service/provincia.service';

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
    selector: 'app-demnadaproductoagropecuario',
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
        MultiSelectModule,
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
    templateUrl: "./demandaproductoagropecuario.components.html",
    providers: [MessageService, DemandaProductosAgropecuariosService, ConfirmationService]
})
export class DemandaProductoAgropecuario implements OnInit {
    demandaproductoagropecuarioDialogo: boolean = false;
    demandasproductosagropecuarios = signal<DemandaProductosAgropecuarios[]>([]);
    demandaproductoagropecuario: DemandaProductosAgropecuarios = {
        id: 0,
        provincia_id: 0,
        distrito_id: 0,
        nombre_provincia_distrito: '',
        fecha_publicacion: '',
        descripcion: '',
        nota: '',
        direccion: '',
        contacto: '',
        telefono: '',
        email: '',
        estado_id: 1,
        fecha_creacion: '',
        fecha_modificacion: '',
        detalle: []

    };
    seleccionarDemandaProductosAgropecuarios!: DemandaProductosAgropecuarios[] | null;
    enviar: boolean = false;
    isLoading: boolean = false;
    cols: { field: string; header: string }[] = [];
    accion: number = 1;
    opcionesEstado: Estado[] = [];
    opcionesProvinciasActivas: ProvinciasActivas[] = [];
    opcionesDistritosActivos: DistritosActivos[] = [];
    opcionesProductosActivos: ProductosActivos[] = [];

    skeletonRows = Array(8).fill({});

    estado = [
        { label: 'ACTIVO', value: 1 },
        { label: 'INACTIVO', value: 2 }
    ];

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    constructor(
        private demandaproductoagropecuarioService: DemandaProductosAgropecuariosService,
        private messageService: MessageService,
        private estadoService: EstadoService,
        private provinciaService: ProvinciaService,
        private distritoService: DistritoService,
        private productoService: ProductoService,
    ) { }

    async cargarDemandaProductosAgropecuarios() {
        this.isLoading = true;
        try {
            const response: DemandaProductosAgropecuarios[] = await this.demandaproductoagropecuarioService.getDemandaProductosAgropecuarios();
            this.demandasproductosagropecuarios.set(response);
        } catch (error) {
            console.error('Error al cargar las demandas productos agropecuarios', error);
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
            { field: 'nombre_provincia_distrito', header: 'Provincia - Distrito' },
            { field: 'fecha_publicacion', header: 'Fecha publicación' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'nota', header: 'Nota' },
            { field: 'direccion', header: 'Dirección' },
            { field: 'contacto', header: 'Contacto' },
            { field: 'telefono', header: 'Teléfono' },
            { field: 'email', header: 'Email' },
            { field: 'estado_id', header: 'Estado' },
            { field: 'fecha_creacion', header: 'Fecha creación' },
            { field: 'fecha_modificacion', header: 'Fecha modificación' }
        ];
        try {
            await Promise.all([this.cargarOpciones(this.provinciaService.getProvinciasActivas.bind(this.provinciaService), this.opcionesProvinciasActivas, 'provincias activas')]);
            await Promise.all([this.cargarOpciones(this.distritoService.getDistritosActivos.bind(this.distritoService), this.opcionesDistritosActivos, 'distritos activos')]);
            await Promise.all([this.cargarOpciones(this.productoService.getProductosActivos.bind(this.productoService), this.opcionesProductosActivos, 'productos activos')]);
            await Promise.all([this.cargarOpciones(this.estadoService.getEstado.bind(this.estadoService), this.opcionesEstado, 'estado')]);
            await this.cargarDemandaProductosAgropecuarios();
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
        this.demandaproductoagropecuarioDialogo = true;
    }

    limpiarDatos() {
        this.demandaproductoagropecuario = {
            id: 0,
            provincia_id: 0,
            distrito_id: 0,
            nombre_provincia_distrito: '',
            fecha_publicacion: '',
            descripcion: '',
            nota: '',
            direccion: '',
            contacto: '',
            telefono: '',
            email: '',
            estado_id: 1,
            fecha_creacion: '',
            fecha_modificacion: '',
            detalle: []
        };
    }

    ocultarDialogo() {
        this.demandaproductoagropecuarioDialogo = false;
        this.enviar = false;
    }

    async guardarDemandaProductoAgropecuario() {
        this.enviar = true;

        this.isLoading = true;
        try {

            const DemandaProductoAgropecuarioParaEnviar = {
                id: this.demandaproductoagropecuario.id,
                provincia_id: this.demandaproductoagropecuario.provincia_id,
                distrito_id: this.demandaproductoagropecuario.distrito_id,
                fecha_publicacion: this.demandaproductoagropecuario.fecha_publicacion,
                descripcion: this.demandaproductoagropecuario.descripcion,
                nota: this.demandaproductoagropecuario.nota,
                direccion: this.demandaproductoagropecuario.direccion,
                contacto: this.demandaproductoagropecuario.contacto,
                telefono: this.demandaproductoagropecuario.telefono,
                email: this.demandaproductoagropecuario.email,
                estado: this.demandaproductoagropecuario.estado_id,
                fecha_creacion: this.demandaproductoagropecuario.fecha_creacion,
                fecha_modificacion: this.demandaproductoagropecuario.fecha_modificacion
            };

            const response = this.accion === 1
                ? await this.demandaproductoagropecuarioService.createDemandaProductosAgropecuarios(DemandaProductoAgropecuarioParaEnviar)
                : await this.demandaproductoagropecuarioService.updateDemandaProductosAgropecuarios(this.demandaproductoagropecuario.id, DemandaProductoAgropecuarioParaEnviar);

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user || 'Operación exitosa' });
            await this.cargarDemandaProductosAgropecuarios();
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

    editarDemandaProductosAgropecuarios(demandaproductoagropecuario: DemandaProductosAgropecuarios) {
        this.demandaproductoagropecuario = { ...demandaproductoagropecuario };
        this.accion = 2;
        this.demandaproductoagropecuarioDialogo = true;
    }

    async eliminarDemandaProductosAgropecuarios(demandaproductoagropecuario: DemandaProductosAgropecuarios){
        const id = demandaproductoagropecuario.id;
        this.isLoading = true;
        try {
            const response = await this.demandaproductoagropecuarioService.deleteDemandaProductosAgropecuarios(id);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user });
            await this.cargarDemandaProductosAgropecuarios();
        } catch (error: any) {
            const msg = error?.response?.data?.message_user || 'Error inesperado';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        } finally {
            this.isLoading = false;
        }
    }
}



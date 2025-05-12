import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal, ViewChild, model } from '@angular/core';
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
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { SelectButton } from 'primeng/selectbutton';
import { DemandaProductosAgropecuarios } from '@/apis_modelos/demandas/demandaproductosagropecuarios/demandaproductosagropecuarios.model';
import { DemandaProductosAgropecuariosService } from '@/apis_modelos/demandas/demandaproductosagropecuarios/demandaproductosagropecuarios.service';
import { Estado } from '@/apis_modelos/general/estado_service/estado.model';
import { CheckboxModule } from 'primeng/checkbox';
import { EstadoService } from '@/apis_modelos/general/estado_service/estado.service';
import { DrawerModule } from 'primeng/drawer';
import { Skeleton } from 'primeng/skeleton';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { CardModule } from 'primeng/card';
import { ProductosActivos } from '@/apis_modelos/categorias/producto_service/productoactivo.model';
import { ProductoService } from '@/apis_modelos/categorias/producto_service/producto.service';
import { TipoProductoService } from '@/apis_modelos/categorias/tipoproducto_service/tipoproducto.service';
import { DistritosActivos } from '@/apis_modelos/general/distrito_servcie/distritosactivos.model';
import { DistritoService } from '@/apis_modelos/general/distrito_servcie/distrito.service';
import { ProvinciasActivas } from '@/apis_modelos/general/provincia_service/provinciasactivas.model';
import { ProvinciaService } from '@/apis_modelos/general/provincia_service/provincia.service';
import { UsuariosSistemaActivos } from '@/apis_modelos/autenticacion/autenticacionactivos.model';
import { UsuarioSistemaService } from '@/apis_modelos/autenticacion/autenticacion.service';
import { ImageUploadService } from '@/apis_modelos/imagenes/imagenes.service';
import { DatePicker } from 'primeng/datepicker';
import { TiposProductosActivos } from '@/apis_modelos/categorias/tipoproducto_service/tipoproductoactivo.model';
import { FileUpload } from 'primeng/fileupload';

;


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
        DataView,
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
        Tag,
        SelectButton,
        Skeleton,
        DividerModule,
        CarouselModule,
        GalleriaModule,
        CardModule,
        DatePicker,
        FileUpload
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: "./demandaproductoagropecuario.components.html",
    providers: [MessageService, DemandaProductosAgropecuariosService, ConfirmationService, ImageUploadService]

})


export class DemandaProductoAgropecuario implements OnInit {
    demandaproductoagropecuarioDialogo: boolean = false;
    demandasproductosagropecuarios = signal<DemandaProductosAgropecuarios[]>([]);
    fechaHoy: Date = new Date();

    demandaproductoagropecuario: DemandaProductosAgropecuarios = {
        id: 0,
        provincia_id: 0,
        distrito_id: 0,
        nombre_provincia_distrito: '',
        fecha_publicacion: this.fechaHoy.toISOString().split('T')[0],
        tipoproducto_id: 0,
        nombre_tipoproducto: '',
        producto_id: 0,
        nombre_producto: '',
        url_imagen: '',
        descripcion: '',
        nota: '',
        direccion: '',
        contacto: '',
        telefono: '',
        email: '',
        usuariosistema_id: 0,
        estado_id: 1,
        fecha_creacion: '',
        fecha_modificacion: '',
    };
    seleccionarDemandaProductosAgropecuarios!: DemandaProductosAgropecuarios[] | null;
    enviar: boolean = false;
    isLoading: boolean = false;
    cols!: Column[];
    accion: number = 1;
    opcionesEstado: Estado[] = [];
    opcionesProvinciasActivas: ProvinciasActivas[] = [];
    opcionesDistritosActivos: DistritosActivos[] = [];
    opcionesProductosActivos: ProductosActivos[] = [];
    opcionesTipoProductosActivos: TiposProductosActivos[] = [];
    opcionesUsuarioSistemaActivos: UsuariosSistemaActivos[] = [];

    layout: string = 'grid';

    options = ['grid'];


    selectedFile: File | null = null;

    onImageSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
        }
    }

    uploadedFiles: File[] = [];

    onFileUpload(event: any) {
        const file: File = event.files[0];
        if (file) {
            this.uploadedFiles = [file];
            this.selectedFile = file;
            this.messageService.add({ severity: 'info', summary: 'Imagen insertada', detail: '' });
        }
    }

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
        private tipoproductoService: TipoProductoService,
        private imageUploadService: ImageUploadService,
        private usuariosistemaService: UsuarioSistemaService
    ) { }


    async cargarDemandaProductosAgropecuarios() {
        this.isLoading = true;
        try {
            const usuarioId = Number(localStorage.getItem('usuarioSistemaId'));
            if (!usuarioId) {
                throw new Error('Usuario no autenticado');
            }

            const response: DemandaProductosAgropecuarios[] = await this.demandaproductoagropecuarioService.getDemandaProductosAgropecuarios(usuarioId);
            this.demandasproductosagropecuarios.set(response);
        } catch (error) {
            console.error('Error al cargar las demandas productos agropecuarios', error);
        } finally {
            this.isLoading = false;
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

    demandasProductosAgropecuarios: any[] = [];


    async ngOnInit() {
        this.isLoading = true;
        try {
            await Promise.all([this.cargarOpciones(this.provinciaService.getProvinciasActivas.bind(this.provinciaService), this.opcionesProvinciasActivas, 'provincias activas')]);
            await Promise.all([this.cargarOpciones(this.distritoService.getDistritosActivos.bind(this.distritoService), this.opcionesDistritosActivos, 'distritos activos')]);
            await Promise.all([this.cargarOpciones(this.productoService.getProductosActivos.bind(this.productoService), this.opcionesProductosActivos, 'productos activos')]);
            await Promise.all([this.cargarOpciones(this.tipoproductoService.getTipoProductoActivos.bind(this.tipoproductoService), this.opcionesTipoProductosActivos, 'tipos productos activos')]);
            this.usuariosistemaService.getUsuarioSistema().then(response => {
                this.opcionesUsuarioSistemaActivos = response;
                const usuarioId = Number(localStorage.getItem('usuarioSistemaId'));
                this.demandaproductoagropecuario.usuariosistema_id = usuarioId;
            }),
            await Promise.all([this.cargarOpciones(this.estadoService.getEstado.bind(this.estadoService), this.opcionesEstado, 'estado')]);
            await this.cargarDemandaProductosAgropecuarios();
            this.demandasProductosAgropecuarios = this.demandasproductosagropecuarios();
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
        const usuarioId = Number(localStorage.getItem('usuarioSistemaId'));
        this.demandaproductoagropecuario.usuariosistema_id = usuarioId;
        this.demandaproductoagropecuarioDialogo = true;
    }

    limpiarDatos() {
        const usuarioId = Number(localStorage.getItem('usuarioSistemaId'));

        this.demandaproductoagropecuario = {
            id: 0,
            provincia_id: 0,
            distrito_id: 0,
            nombre_provincia_distrito: '',
            fecha_publicacion: this.fechaHoy.toISOString().split('T')[0],
            tipoproducto_id: 0,
            nombre_tipoproducto: '',
            producto_id: 0,
            nombre_producto: '',
            url_imagen: '',
            descripcion: '',
            nota: '',
            direccion: '',
            contacto: '',
            telefono: '',
            email: '',
            usuariosistema_id: usuarioId,
            estado_id: 1,
            fecha_creacion: '',
            fecha_modificacion: '',
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
            // Asegurarse de que la fecha esté en formato correcto 'YYYY-MM-DD'
            const fechaPublicacion = new Date(this.demandaproductoagropecuario.fecha_publicacion);
            this.demandaproductoagropecuario.fecha_publicacion = fechaPublicacion.toISOString().split('T')[0];  // Formato 'YYYY-MM-DD'

            if (this.selectedFile) {
                const uploadResp: any = await this.imageUploadService.uploadImage(this.selectedFile).toPromise();
                this.demandaproductoagropecuario.url_imagen = uploadResp.secure_url;
            }

            const usuarioSistemaId = Number(localStorage.getItem('usuarioSistemaId'));
            if (!usuarioSistemaId) {
                throw new Error('Usuario no autenticado');
            }

            const DemandaProductoAgropecuarioParaEnviar = {
                id: this.demandaproductoagropecuario.id,
                provincia: this.demandaproductoagropecuario.provincia_id,
                distrito: this.demandaproductoagropecuario.distrito_id,
                fecha_publicacion: this.demandaproductoagropecuario.fecha_publicacion,
                tipoproducto: this.demandaproductoagropecuario.tipoproducto_id || null,
                producto: this.demandaproductoagropecuario.producto_id || null,
                url_imagen: this.demandaproductoagropecuario.url_imagen,
                descripcion: this.demandaproductoagropecuario.descripcion,
                nota: this.demandaproductoagropecuario.nota,
                direccion: this.demandaproductoagropecuario.direccion,
                contacto: this.demandaproductoagropecuario.contacto,
                telefono: this.demandaproductoagropecuario.telefono,
                email: this.demandaproductoagropecuario.email,
                usuariosistema: usuarioSistemaId,
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

    async eliminarDemandaProductosAgropecuarios(demandaproductoagropecuario: DemandaProductosAgropecuarios) {
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



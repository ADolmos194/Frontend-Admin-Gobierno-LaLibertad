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
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Demandas } from '@/apis_modelos/demandas/demandas.models';
import { DemandasService } from '@/apis_modelos/demandas/demandas.service';
import { Estado } from '@/apis_modelos/general/estado_service/estado.model';
import { CheckboxModule } from 'primeng/checkbox';
import { EstadoService } from '@/apis_modelos/general/estado_service/estado.service';
import { DrawerModule } from 'primeng/drawer';
import { Skeleton } from 'primeng/skeleton';
import { ProductosActivos } from '@/apis_modelos/categorias/producto_service/productoactivo.model';
import { ProductoService } from '@/apis_modelos/categorias/producto_service/producto.service';
import { TipoProductoService } from '@/apis_modelos/categorias/tipoproducto_service/tipoproducto.service';
import { DistritosActivos } from '@/apis_modelos/general/distrito_servcie/distritosactivos.model';
import { DistritoService } from '@/apis_modelos/general/distrito_servcie/distrito.service';
import { ProvinciasActivas } from '@/apis_modelos/general/provincia_service/provinciasactivas.model';
import { ProvinciaService } from '@/apis_modelos/general/provincia_service/provincia.service';
import { DatePicker } from 'primeng/datepicker';
import { ImageUploadService } from '@/apis_modelos/imagenes/imagenes.service';
import { TiposProductosActivos } from '@/apis_modelos/categorias/tipoproducto_service/tipoproductoactivo.model';
import { TooltipModule } from 'primeng/tooltip';
import { FileUpload } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { CookieService } from 'ngx-cookie-service';
import { TipoDemandasActivas } from '@/apis_modelos/demandas/tipodemandasactivos.model';


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
    selector: 'app-demnadas',
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
        DatePicker,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        Skeleton,
        TooltipModule,
        FileUpload, CardModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: "./demandas.components.html",
    providers: [MessageService, DemandasService, ConfirmationService, ImageUploadService]

})


export class DemandasGeneral implements OnInit {
    demandasDialogo: boolean = false;
    MostrarDemandaEcommerceDialogo: boolean = false;
    accionMostrarDemandaEcommerceDialogo: number = 1;
    demandas = signal<Demandas[]>([]);
    fechaHoy: Date = new Date();
    demanda: Demandas = {
        id: 0,
        tiposdemandas_id: 0,
        nombre_tipodemanda: '',
        url_imagen: '',
        fecha_publicacion: this.fechaHoy,
        tipoproducto_id: 0,
        nombre_tipoproducto: '',
        producto_id: 0,
        nombre_producto: '',
        descripcion: '',
        nota: '',
        distrito_id:0,
        nombre_distrito:'',
        localidadcaserio: '',
        nombre_localidadcaserio: '',
        direccion: '',
        referencia_ubicacion: '',
        contacto: '',
        telefono: '',
        email: '',
        usuariosistema_id: 0,
        nombre_usuario: '',
        estado_id: 1,
        fecha_creacion: '',
        fecha_modificacion: '',
    };
    seleccionarDemandas!: Demandas[] | null;
    enviar: boolean = false;
    isLoading: boolean = false;
    cols: { field: string; header: string }[] = [];
    accion: number = 1;
    opcionesEstado: Estado[] = [];
    opcionesProvinciasActivas: ProvinciasActivas[] = [];
    opcionesDistritosActivos: DistritosActivos[] = [];
    opcionesProductosActivos: ProductosActivos[] = [];
    opcionesTipoProductosActivos: TiposProductosActivos[] = [];
    opcionesTipoDemandasActivas: TipoDemandasActivas[] = [];

    skeletonRows: any[] = new Array(8).fill({});

    selectedFile: File | null = null;
    previewUrl: string | null = null;

    onImageSelected(event: any) {
        const file: File = event.files?.[0] || event.target.files?.[0];

        if (file) {
            this.selectedFile = file;

            // Crear vista previa
            const reader = new FileReader();
            reader.onload = () => {
                this.previewUrl = reader.result as string;
            };
            reader.readAsDataURL(file);
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
        private demandasService: DemandasService,
        private messageService: MessageService,
        private estadoService: EstadoService,
        private provinciaService: ProvinciaService,
        private distritoService: DistritoService,
        private productoService: ProductoService,
        private tipoproductoService: TipoProductoService,
        private imageUploadService: ImageUploadService,
        private confirmationService: ConfirmationService,
        private cookieService: CookieService
    ) { }

    getUsuarioSistemaId(): number | null {
        const rawUsuarioSistema = this.cookieService.get('userData');
        if (rawUsuarioSistema && rawUsuarioSistema !== 'undefined') {
            try {
                const usuario = JSON.parse(decodeURIComponent(rawUsuarioSistema));
                return usuario?.id ?? null;
            } catch (e) {
                console.error('Error al parsear userData en cookie', e);
                return null;
            }
        }
        return null;
    }

    async cargarDemandas() {
        this.isLoading = true;
        this.cols = [
            { field: '', header: '' },
            { field: 'nombre_tipodemanda', header: 'Tipo de demanda' },
            { field: 'url_imagen', header: 'Imagen' },
            { field: 'fecha_publicacion', header: 'Fecha de publicación' },
            { field: 'nombre_tipoproducto', header: 'Tipo de producto' },
            { field: 'nombre_producto', header: 'Producto' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'nota', header: 'Nota' },
            { field: 'nombre_distrito', header: 'Distrito' },
            { field: 'nombre_localidadcaserio', header: 'Localidad - Caserio' },
            { field: 'direccion', header: 'Dirección' },
            { field: 'referencia_ubicacion', header: 'Referencia de ubicación' },
            { field: 'contacto', header: 'Contacto' },
            { field: 'telefono', header: 'Telefono' },
            { field: 'email', header: 'Email' },
            { field: 'estado_id', header: 'Estado' },
            { field: 'nombre_usuario', header: 'Usuario' },
            { field: 'fecha_creacion', header: 'Fecha creación' },
            { field: 'fecha_modificacion', header: 'Fecha modificación' }
        ];
        try {
            const usuarioId = this.getUsuarioSistemaId();
            if (usuarioId === null) {
                throw new Error('Usuario no autenticado');
            }
            const response: Demandas[] = await this.demandasService.getDemandas(usuarioId);
            this.demandas.set(response);
        } catch (error) {
            console.error('Error al cargar las demandas', error);
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

    demandasgeneral: any[] = [];


    async ngOnInit() {
        this.isLoading = true;
        try {
            await Promise.all([this.cargarOpciones(this.demandasService.getTiposDemandas.bind(this.demandasService), this.opcionesTipoDemandasActivas, 'tipos demandas activos')]);
            await Promise.all([this.cargarOpciones(this.provinciaService.getProvinciasActivas.bind(this.provinciaService), this.opcionesProvinciasActivas, 'provincias activas')]);
            await Promise.all([this.cargarOpciones(this.distritoService.getDistritosActivos.bind(this.distritoService), this.opcionesDistritosActivos, 'distritos activos')]);
            await Promise.all([this.cargarOpciones(this.productoService.getProductosActivos.bind(this.productoService), this.opcionesProductosActivos, 'productos activos')]);
            await Promise.all([this.cargarOpciones(this.tipoproductoService.getTipoProductoActivos.bind(this.tipoproductoService), this.opcionesTipoProductosActivos, 'tipos productos activos')]);
            await Promise.all([this.cargarOpciones(this.estadoService.getEstado.bind(this.estadoService), this.opcionesEstado, 'estado')]);
            const usuarioId = this.getUsuarioSistemaId();
            await this.cargarDemandas();
            this.demandasgeneral = this.demandas();
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
        const usuarioId = this.getUsuarioSistemaId();
        if (usuarioId) {
            this.demanda.usuariosistema_id = usuarioId;
        }
        this.demandasDialogo = true;
        this.selectedFile = null;
        this.previewUrl = null;
        this.demanda.tiposdemandas_id = 1;
    }

    abrirDemandaEcommerceDialogo(demandaSeleccionada: Demandas) {
        this.accionMostrarDemandaEcommerceDialogo = 1;
        this.enviar = false;
        this.demanda = { ...demandaSeleccionada };
        this.MostrarDemandaEcommerceDialogo = true;
    }

    limpiarDatos() {

        const usuarioId = this.getUsuarioSistemaId();

        this.demanda = {
            id: 0,
            tiposdemandas_id: 0,
            nombre_tipodemanda: '',
            url_imagen: '',
            fecha_publicacion: this.fechaHoy,
            tipoproducto_id: 0,
            nombre_tipoproducto: '',
            producto_id: 0,
            nombre_producto: '',
            descripcion: '',
            nota: '',
            distrito_id:0,
            nombre_distrito:'',
            localidadcaserio: '',
            nombre_localidadcaserio: '',
            direccion: '',
            referencia_ubicacion: '',
            contacto: '',
            telefono: '',
            email: '',
            usuariosistema_id: usuarioId || 0,
            nombre_usuario: '',
            estado_id: 1,
            fecha_creacion: '',
            fecha_modificacion: '',
        };
    }


    ocultarDialogo() {
        this.demandasDialogo = false;
        this.enviar = false;
        this.selectedFile = null;
        this.previewUrl = null;
    }


    async guardarDemandas() {
        this.enviar = true;

        this.isLoading = true;
        try {


            if (this.selectedFile) {
                const uploadResp: any = await this.imageUploadService.uploadImage(this.selectedFile).toPromise();
                this.demanda.url_imagen = uploadResp.secure_url;
            }

            const usuarioId = this.getUsuarioSistemaId();

            const DemandaParaEnviar = {
                id: this.demanda.id,
                tiposdemandas: this.demanda.tiposdemandas_id,
                url_imagen: this.demanda.url_imagen,
                fecha_publicacion: this.demanda.fecha_publicacion,
                tipoproducto: this.demanda.tipoproducto_id,
                producto: this.demanda.producto_id,
                descripcion: this.demanda.descripcion,
                nota: this.demanda.nota,
                distrito: this.demanda.distrito_id,
                localidadcaserio: this.demanda.localidadcaserio,
                direccion: this.demanda.direccion,
                referencia_ubicacion: this.demanda.referencia_ubicacion,
                contacto: this.demanda.contacto,
                telefono: this.demanda.telefono,
                email: this.demanda.email,
                usuariosistema: usuarioId,
                estado: this.demanda.estado_id,
                fecha_creacion: this.demanda.fecha_creacion,
                fecha_modificacion: this.demanda.fecha_modificacion
            };

            const response = this.accion === 1
                ? await this.demandasService.createDemandas(DemandaParaEnviar)
                : await this.demandasService.updateDemandas(this.demanda.id, DemandaParaEnviar);

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user || 'Operación exitosa' });
            await this.cargarDemandas();
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

    editarDemandas(demanda: Demandas) {
        this.demanda = {
            ...demanda,
            fecha_publicacion: demanda.fecha_publicacion ? new Date(demanda.fecha_publicacion) : this.fechaHoy
        };
        this.accion = 2;
        this.demandasDialogo = true;
        this.previewUrl = this.demanda.url_imagen || null;
        this.selectedFile = null;
    }


    async eliminarDemandas(demanda: Demandas) {
        this.confirmationService.confirm({
            message: `¿Estás seguro de que deseas eliminar la demanda "${demanda.descripcion}"?`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-secondary',
            accept: async () => {
                this.isLoading = true;
                try {
                    const response = await this.productoService.deleteProducto(demanda.id);
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user });
                    await this.cargarDemandas();
                } catch (error: any) {
                    const msg = error?.response?.data?.message_user || 'Error inesperado';
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
                } finally {
                    this.isLoading = false;
                }
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'No se eliminó la demanda' });
            }
        });
    }

    async eliminarDemandasSeleccionadas() {
    if (!this.seleccionarDemandas || this.seleccionarDemandas.length === 0) {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No hay demandas seleccionadas' });
        return;
    }

    this.confirmationService.confirm({
        message: `¿Estás seguro de que deseas eliminar ${this.seleccionarDemandas.length} demandas seleccionadas?`,
        header: 'Confirmar eliminación múltiple',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary',
        accept: async () => {
            this.isLoading = true;
            try {
                const ids = this.seleccionarDemandas!.map(d => d.id);
                const response = await this.demandasService.eliminarMultiplesDemandas(ids);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user });
                this.seleccionarDemandas = [];
                await this.cargarDemandas();
            } catch (error: any) {
                const msg = error?.error?.message_user || 'Error inesperado';
                this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
            } finally {
                this.isLoading = false;
            }
        },
        reject: () => {
            this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'No se eliminaron las demandas' });
        }
    });
}


}



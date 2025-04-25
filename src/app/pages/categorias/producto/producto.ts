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
import { Estado } from '@/apis_modelos/general/estado_service/estado.model';
import { CheckboxModule } from 'primeng/checkbox';
import { EstadoService } from '@/apis_modelos/general/estado_service/estado.service';
import { DrawerModule } from 'primeng/drawer';
import { Skeleton } from 'primeng/skeleton';
import { Productos } from '@/apis_modelos/categorias/producto_service/producto.model';
import { ProductoService } from '@/apis_modelos/categorias/producto_service/producto.service';
import { TiposProductosActivos } from '@/apis_modelos/categorias/tipoproducto_service/tipoproductoactivo.model';
import { TipoProductoService } from '@/apis_modelos/categorias/tipoproducto_service/tipoproducto.service';

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
    selector: 'app-productos',
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
    templateUrl: './producto.components.html',
    providers: [MessageService, ProductoService, ConfirmationService]
})
export class Producto implements OnInit {
    productoDialogo: boolean = false;
    productos = signal<Productos[]>([]);
    producto: Productos = {
        id: 0,
        nombre: '',
        tipoproducto_id: 0,
        nombre_tipoproducto: '',
        codigo: '',
        serie: '',
        estado_id: 1,
        fecha_creacion: '',
        fecha_modificacion: ''
    };
    seleccionarProductos!: Productos[] | null;
    enviar: boolean = false;
    isLoading: boolean = false;
    cols: { field: string; header: string }[] = [];
    accion: number = 1;
    opcionesTipoProducto: TiposProductosActivos[] = [];
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
        private productoService: ProductoService,
        private messageService: MessageService,
        private estadoService: EstadoService,
        private tipoproductoService: TipoProductoService
    ) {}

    async cargarProductos() {
        this.isLoading = true;
        try {
            const response: Productos[] = await this.productoService.getProductos();
            this.productos.set(response);
        } catch (error) {
            console.error('Error al cargar los productos', error);
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
            { field: 'nombre', header: 'Producto' },
            { field: 'nombre_tipoproducto', header: 'Tipo producto' },
            { field: 'codigo', header: 'Código' },
            { field: 'serie', header: 'Serie' },
            { field: 'estado_id', header: 'Estado' },
            { field: 'fecha_creacion', header: 'Fecha creación' },
            { field: 'fecha_modificacion', header: 'Fecha modificación' }
        ];
        try {
            await Promise.all([this.cargarOpciones(this.tipoproductoService.getTipoProductoActivos.bind(this.tipoproductoService), this.opcionesTipoProducto, 'tipo producto activo')]);
            await Promise.all([this.cargarOpciones(this.estadoService.getEstado.bind(this.estadoService), this.opcionesEstado, 'estado')]);
            await this.cargarProductos();
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        } finally {
            this.isLoading = false;
        }
    }

    abrirNuevo() {
        this.accion = 1;
        this.enviar = false;
        this.limpiarDatos();
        this.productoDialogo = true;
    }

    limpiarDatos() {
        this.producto = {
            id: 0,
            nombre: '',
            tipoproducto_id: 0,
            nombre_tipoproducto: '',
            codigo: '',
            serie: '',
            estado_id: 1,
            fecha_creacion: '',
            fecha_modificacion: ''
        };
    }

    ocultarDialogo() {
        this.productoDialogo = false;
        this.enviar = false;
    }

    async guardarProducto() {
        this.enviar = true;

        this.isLoading = true;
        try {

            const ProductoParaEnviar = {
                id: this.producto.id,
                nombre: this.producto.nombre,
                tipoproducto: this.producto.tipoproducto_id,
                codigo: this.producto.codigo,
                serie: this.producto.serie,
                estado: this.producto.estado_id,
                fecha_creacion: this.producto.fecha_creacion,
                fecha_modificacion: this.producto.fecha_modificacion
            };

            const response = this.accion === 1
                ? await this.productoService.createProducto(ProductoParaEnviar)
                : await this.productoService.updateProducto(this.producto.id, ProductoParaEnviar);

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user || 'Operación exitosa' });
            await this.cargarProductos();
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

    editarProducto(producto: Productos) {
        this.producto = { ...producto };
        this.accion = 2;
        this.productoDialogo = true;
    }

    async eliminarProducto(producto: Productos) {
        const id = producto.id;
        this.isLoading = true;
        try {
            const response = await this.productoService.deleteProducto(id);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message_user });
            await this.cargarProductos();
        } catch (error: any) {
            const msg = error?.response?.data?.message_user || 'Error inesperado';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        } finally {
            this.isLoading = false;
        }
    }
}

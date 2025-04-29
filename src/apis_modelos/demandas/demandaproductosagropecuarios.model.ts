export interface DemandaProductosAgropecuarios {
    id: number;
    provincia_id: number;
    distrito_id: number;
    nombre_provincia_distrito: string;
    fecha_publicacion: string;
    descripcion: string;
    nota: string;
    direccion: string;
    contacto: string;
    telefono: string;
    email: string;
    estado_id: number;
    fecha_creacion: string;
    fecha_modificacion: string;
    detalle: DetalleDemandaProductosAgropecuarios[];
}


export interface DetalleDemandaProductosAgropecuarios{
    id: number;
    producto_id: number;
    nombre_producto: string;
    imagen: string;
    estado_id: number;
    fecha_creacion: string;
    fecha_modificacion: string;
}

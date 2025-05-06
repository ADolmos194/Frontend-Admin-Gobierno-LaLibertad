export interface DemandaProductosAgropecuarios {
    id: number;
    provincia_id: number;
    distrito_id: number;
    nombre_provincia_distrito: string;
    fecha_publicacion: string;
    tipoproducto_id: number;
    nombre_tipoproducto: string;
    producto_id: number;
    nombre_producto: string;
    url_imagen: string;
    descripcion: string;
    nota: string;
    direccion: string;
    contacto: string;
    telefono: string;
    email: string;
    estado_id: number;
    fecha_creacion: string;
    fecha_modificacion: string;
}

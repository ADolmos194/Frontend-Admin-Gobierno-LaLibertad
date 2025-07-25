export interface Ofertas {
    id: number;
    tiposofertas_id: number,
    nombre_tiposofertas: string,
    url_imagen: string,
    fecha_publicacion: Date,
    tipoproducto_id: number,
    nombre_tipoproducto: string,
    producto_id : number,
    nombre_producto: string,
    descripcion : string,
    nota: string,
    localidadcaserio_id : number,
    nombre_localidadcaserio: string,
    direccion : string,
    referencia_ubicacion: string,
    contacto : string,
    telefono : string,
    email: string,
    web:string
    usuariosistema_id : number,
    nombre_usuario: string,
    estado_id: number,
    fecha_creacion : string,
    fecha_modificacion : string,
}

export interface PreciosMercadosMayoristasMinoristas {
    id: number;
    producto_id: number;
    nombre_producto: string;
    unidadmedida_id: number;
    nombre_unidadmedida: string;
    valor_equivalente_kilogramo_litro: number;
    precio_minimo: number;
    precio_promedio: number;
    precio_maximo: number;
    estado_id: number;
    fecha_creacion: string;
    fecha_modificacion: string;
}

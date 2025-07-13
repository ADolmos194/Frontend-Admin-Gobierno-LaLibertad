export interface UsuariosSistemasRegister {
    id: number;
    nombrecompleto: string;
    usuario: string;
    password: string;
    email: string;
    tipodocumento: string;
    numerodocumento: string;
    numero_celular: string;
    numero_telefono: string;
    distrito_id: number;
    direccion: string;
    terminos_condiciones: boolean;
    estado_id: number;
    [key: string]: any;
}

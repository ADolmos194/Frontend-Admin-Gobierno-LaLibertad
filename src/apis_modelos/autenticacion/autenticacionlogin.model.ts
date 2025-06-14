export interface UsuariosSistemaLogin {
    usuario: string;
    password: string;
}

export interface UsuarioSistemaLoginResponse {
    id: number;
    usuario: string;
    access: string;
    refresh: string;
}

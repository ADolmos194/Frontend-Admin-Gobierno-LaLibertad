export interface UsuariosSistemaLogin {
    usuario: string;
    password: string;
}

export interface UsuarioSistemaLoginResponse {

    access: string;
    refresh: string;
    userData: {
        key_user: string;
        usuario: string;
        nombre: string;
        email: string;
    };
}

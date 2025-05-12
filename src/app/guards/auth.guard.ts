import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { UsuarioSistemaService } from '@/apis_modelos/autenticacion/autenticacion.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const usuarioService = inject(UsuarioSistemaService);
    const router = inject(Router);

    const usuario = localStorage.getItem('usuario'); // Verificación simple, puedes ajustarla con el servicio

    if (usuario) {
        return true; // Permite el acceso si el usuario está autenticado
    } else {
        router.navigate(['/auth/login']); // Redirige al login si no está autenticado
        return false; // Bloquea el acceso
    }
};

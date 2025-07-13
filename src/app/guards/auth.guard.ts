import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const cookie = inject(CookieService);

    const accessToken = cookie.get('access_token');

    if (accessToken) {
        return true;
    }

    router.navigate(['/auth/login']);
    return false;
};


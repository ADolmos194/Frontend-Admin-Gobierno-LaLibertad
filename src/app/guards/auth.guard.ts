import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    const accessToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='));

    if (accessToken) {
        return true;
    } else {
        router.navigate(['/auth/login']);
        return false;
    }
};


import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

export const authGaurd = (next: ActivatedRouteSnapshot) => {
    const authService: AuthService = inject(AuthService);
    const router = inject(Router);
    if(authService.isLoggedIn) {
        return true;
    }
    return router.parseUrl("/login");
}
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export function AuthInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    const authService = inject(AuthService);

    const session = authService.getSession();

    if(session){
        request = request.clone({setHeaders: {'x-auth-token': session.access_token}});
    }

    return next(request);

}
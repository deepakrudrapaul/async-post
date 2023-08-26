import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { AppConstants } from '../utils/app-constants';
import { LocalStorageService } from "./local-storage.service";

interface User {}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  private http = inject(HttpClient);
  private storageService = inject(LocalStorageService);
  private router = inject(Router);
  private baseUrl =
    import.meta.env.BASE_URL + AppConstants.API_VERSION + '/auth';

  constructor() {}

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getSession() {
    return this.storageService.getItem(AppConstants.SESSION);
  }

  setSession(session: Session) {
    this.storageService.setItem(AppConstants.SESSION, session);
  }

  getUser() {
    return this.storageService.getItem(AppConstants.USER);
  }

  setUser(user: Object) {
    this.storageService.setItem(AppConstants.USER, user);
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/signup`, { email, password });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(
      map((resp:any) => {
        console.log(resp);
        this.setSession(resp.session);
        this.setUser(resp.user);
        this.router.navigate(['/']);
        this.loggedIn.next(true);
        return resp;
      })
    );
  }

  logout() {
    this.loggedIn.next(false);
    this.storageService.clearAll();
    this.router.navigate(['/login']);
  }
}

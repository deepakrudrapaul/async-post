import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, mergeMap, timer } from 'rxjs';
import { AppConstants } from '../utils/app-constants';
import { LocalStorageService } from "./local-storage.service";
import { Session } from "../utils/models/session";

interface User {}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<any>(null);
  private http = inject(HttpClient);
  private storageService = inject(LocalStorageService);
  private router = inject(Router);
  loopCount: number = 600;

  private baseUrl =
    import.meta.env.BASE_URL + AppConstants.API_VERSION + '/auth';

  constructor() {}

  isLoggedIn() {
    return this.user.asObservable();
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
        this.setSession(resp.session);
        this.setUser(resp.user);
        this.router.navigate(['/']);
        this.user.next(resp.user);
        return resp;
      })
    );
  }
  createAuthWindow(url: string) {
    const options =   `width=${500},height=${600},left=${0},top=${0}`;
    return window.open(url, 'Twitter Authorization', options);
  }

  getQueryParamValue(key: string,url: string): string | null {
    const queryString = url.split('#')[1];
    if (!queryString) return null;
    const searchParams = new URLSearchParams(queryString);
    return searchParams.get(key);
  }
  


  doLogin(url: string) {
    let handleWindow = this.createAuthWindow(url);
    let subscription = timer(0, 100).subscribe(()=> {
      if(this.loopCount-- < 0) {
        handleWindow?.close();
      } else {
        let href = '';
        try{
          href = handleWindow? handleWindow.location.href: '';
        } catch(e){
        }
        
        if(href.match(AppConstants.ACCESS_TOKEN)) {
          const accessToken =  this.getQueryParamValue(AppConstants.ACCESS_TOKEN, href) || '';
          const refreshToken = this.getQueryParamValue(AppConstants.REFRESH_TOKEN, href) || '';
          const type = this.getQueryParamValue(AppConstants.TOKEN_TYPE, href) || '';

          let session:Session;
          session = { access_token: accessToken, refresh_token: refreshToken, token_type: type };
          this.setSession(session);

          this.getUserProfile().subscribe((resp:any)=> {
            this.setUser(resp.user);
            this.router.navigate(['/']);
            this.user.next(resp.user);
          });
           
          handleWindow?.close();
          subscription.unsubscribe();
        }
      }
    })
  }

  socialLogin(provider: string) {
    return this.http.post(`${this.baseUrl}/social-login`, {provider}).pipe(
      map((resp:any) => {
        this.doLogin(resp.url);
        return resp;
      })
    )
  }

  getUserProfile() {
    return this.http.get(`${this.baseUrl}/user`);
  }

  logout() {
    this.user.next(null);
    this.storageService.clearAll();
    this.router.navigate(['/login']);
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

interface User {

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
   }

   public get isLoggedIn() {
    return this.loggedIn.value;
   }

  login(email: string, password: string) {
    this.loggedIn.next(true);
    this.router.navigate(['/']);
  }


  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

}

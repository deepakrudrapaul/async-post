import { RouteMeta } from "@analogjs/router";
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router, RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";

export const routeMeta: RouteMeta = {
  title: 'Signup',

}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './index.component.html',
})
export default class SignupComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  isLoading: boolean = false;


  login = {
    email:'',
    password: '',
  };


  handleSubmit(form: NgForm) {
    this.isLoading = true;
    const {email, password } = form.value;
    this.authService.signup(email, password).subscribe({
      next: (res) =>  {
        this.authService.loggedIn.next(true);
        alert("Email verification link has been sent. Please verify your email");
        this.isLoading = false;
      },
      error: (err) => { 
        this.isLoading = false;
        alert(err.error.message);
      }
    });
  }
  
}

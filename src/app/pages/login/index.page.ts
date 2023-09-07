import { RouteMeta } from "@analogjs/router";
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router, RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";

export const routeMeta: RouteMeta = {
  title: 'Login',

}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './index.component.html',
})
export default class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading: boolean = false;

  

  login = {
    email:'',
    password: '',
  };


  constructor() {
    console.log(this.authService.getSession())
    if(this.authService.getSession()) {
      this.router.navigate(['/']);
    }
  }





  handleSocialLogin(provider:string) {
    this.authService.socialLogin(provider).subscribe(resp => {
      
    });
  }


  handleSubmit(form: NgForm) {
    this.isLoading = true;
    const {email, password } = form.value;
    this.authService.login(email, password).subscribe({
      next: (res) =>  {
        form.resetForm();
        this.isLoading = false;
      },
      error: (err) => { 
        this.isLoading = false;
        alert(err.error.message);
      }
    });
  }
  
}

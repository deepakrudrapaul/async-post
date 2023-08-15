import { RouteMeta } from "@analogjs/router";
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

export const routeMeta: RouteMeta = {
  title: 'Login',

}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './index.component.html',
})
export default class LoginComponent {

  authService = inject(AuthService);

  login = {
    email:'',
    password: '',
  };


  handleSubmit(form: NgForm) {
    const {email, password } = form.value;
    this.authService.login(email, password);
  }
  
}

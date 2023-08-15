import { RouteMeta } from "@analogjs/router";
import { Component } from '@angular/core';
import { authGaurd } from "../helpers/auth.gaurd";

export const routeMeta: RouteMeta = {
  title: 'Dashboard',
  canActivate:[authGaurd]
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
  <div>Home Page</div>
  `,

})
export default class HomeComponent {
  
}

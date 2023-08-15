import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';
import { Location, NgFor, NgIf } from "@angular/common";
import { AppConstants } from "./utils/app-constants";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { Title } from "@angular/platform-browser";
import { delay, filter } from "rxjs";
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, RouterLink, NavBarComponent, NgIf],
  templateUrl: './app.component.html',

})
export class AppComponent {
  navItems:NavItem[]= AppConstants.NavItems;
  titleService = inject(Title);
  authService = inject(AuthService);
  isLoggedIn = false;
  router = inject(Router);
  title:string = "";

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), delay(0))
      .subscribe(() => {
        this.title = this.titleService.getTitle()
      })
      this.isLoggedIn = this.authService.isLoggedIn;

  }


  logout() {
    this.authService.logout();
  }
}

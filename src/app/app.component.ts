import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { AppConstants } from "./utils/app-constants";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { Title } from "@angular/platform-browser";
import { Observable, delay, filter } from "rxjs";
import { AuthService } from "./services/auth.service";
import { NavItem } from "./utils/models/nav-item";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, RouterLink, NavBarComponent, NgIf, AsyncPipe],
  templateUrl: './app.component.html',

})
export class AppComponent {
  navItems:NavItem[]= AppConstants.NavItems;
  titleService = inject(Title);
  authService = inject(AuthService);
  user$!:Observable<any>;
  router = inject(Router);
  title:string = "";

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), delay(0))
      .subscribe(() => {
        this.title = this.titleService.getTitle()
      })
      this.user$ = this.authService.isLoggedIn();
      this.checkIfLoggedIn();
    }
    
    
    
    checkIfLoggedIn() {
      if(this.authService.getSession()) {
        this.authService.user.next(this.authService.getUser());
      }
    }
  


  logout() {
    this.authService.logout();
  }
}

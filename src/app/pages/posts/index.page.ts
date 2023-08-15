import { RouteMeta } from "@analogjs/router";
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AppConstants } from "../../utils/app-constants";
import { PostPreviewComponent } from "../../components/post-preview/post-preview.component";
import { PostFormComponent } from "../../components/post-form/post-form.component";
import { authGaurd } from "../../helpers/auth.gaurd";



export const routeMeta: RouteMeta = {
  title: 'Posts',
  canActivate:[authGaurd]
}


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterLink, PostFormComponent, PostPreviewComponent],
  templateUrl: './index.html',

})
export default class PostsComponent {

  routes = AppConstants.Routes;

}

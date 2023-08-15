import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { AppConstants } from "../app-constants";
import { Title } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  titleService = inject(Title);



   getTitle(): Observable<string>  {
      return new BehaviorSubject<string>(this.titleService.getTitle());
   }
}

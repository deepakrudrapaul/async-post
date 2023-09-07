import { RouteMeta } from "@analogjs/router";
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AppConstants } from "../../utils/app-constants";
import { PostPreviewComponent } from "../../components/post-preview/post-preview.component";
import { PostFormComponent } from "../../components/post-form/post-form.component";
import { authGaurd } from "../../helpers/auth.gaurd";
import { DatePipe, KeyValuePipe, NgFor } from "@angular/common";

interface DateArray {
  date: string,
  time: string[]
}

export const routeMeta: RouteMeta = {
  title: 'Queue',
  canActivate:[authGaurd]
}


@Component({
  selector: 'app-queue',
  standalone: true,
  imports: [NgFor, RouterLink, PostFormComponent, PostPreviewComponent, DatePipe],
  templateUrl: './index.html',

})
export default class QueueComponent {

  routes = AppConstants.Routes;
  datesArray: DateArray[] = [];

  constructor() {
    this.datesArray = this.generateDateArray(7);
    console.log(this.datesArray)
  }


  generateDateArray(length: number): Array<DateArray> {
    const currentDate = new Date();
    const dateArray: Array<DateArray> = [];
  
    for (let i = 0; i < length; i++) {
      const currentDateCopy = new Date(currentDate);
      currentDateCopy.setDate(currentDate.getDate() + i);
      const currentDateKey = currentDateCopy.toISOString().split("T")[0];
      const time1 = "10:00";
      const time2 = "19:00";
      dateArray.push({ date : currentDateKey, time : [time1, time2] });
    }
  
    return dateArray;
  }

}

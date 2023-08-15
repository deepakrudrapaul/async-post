import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matAddAPhotoOutline, matAddCircleOutlineOutline } from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers:[provideIcons({ matAddAPhotoOutline, matAddCircleOutlineOutline })],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {

}

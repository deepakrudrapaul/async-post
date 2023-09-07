import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matAddAPhotoOutline,
  matAddCircleOutlineOutline,
  matCloseOutline,
} from '@ng-icons/material-icons/outline';
import { FormsModule, NgForm } from '@angular/forms';

interface Post {
  content: string;
}
interface PostForm {
  post: Post[];
}

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, NgIconComponent, FormsModule],
  providers: [
    provideIcons({
      matAddAPhotoOutline,
      matAddCircleOutlineOutline,
      matCloseOutline,
    }),
  ],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  postForm: PostForm = {
    post: [],
  };

  ngOnInit(): void {
    this.addPost();
  }

  handleSubmit(form: NgForm) {}

  addPost(): void {
    this.postForm.post.push({ content: '' });
  }

  removePost(position: number): void {
    let post = this.postForm.post.filter((post, index) => position !== index);
    this.postForm.post = post;
  }
}

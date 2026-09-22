import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService, UserDto } from '../../services/postService';

@Component({
  selector: 'app-add-post',
  imports: [FormsModule],
  templateUrl: './add-post.html',
  styleUrl: './add-post.css'
})
export class AddPost {

  postService = inject(PostService);
  router = inject(Router);

  users: UserDto[] = [];

  userId = 0;
  title = '';
  body = '';

  ngOnInit() {
    this.postService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },

      error: (error) => {
        console.log(error);
      }
    });
  }

  addPost() {
    const post = {
      userId: this.userId,
      title: this.title,
      body: this.body
    };

    this.postService.addPost(post).subscribe({
      next: (response) => {
        console.log('Post added:', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
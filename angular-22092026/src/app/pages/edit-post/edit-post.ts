import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService, PostDto, UserDto } from '../../services/postService';

@Component({
  selector: 'app-edit-post',
  imports: [FormsModule],
  templateUrl: './edit-post.html',
  styleUrl: './edit-post.css'
})
export class EditPost {

  postService = inject(PostService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  users: UserDto[] = [];

  postId = 0;
  userId = 0;
  title = '';
  body = '';

  ngOnInit() {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUsers();
    this.loadPost();
  }

  loadUsers() {
    this.postService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },

      error: (error) => {
        console.log(error);
      }
    });
  }

  loadPost() {
    this.postService.getPosts().subscribe({

      next: (posts) => {
        const post = posts.find(
          post => post.id === this.postId
        );
        if (post) {
          this.userId = post.userId;
          this.title = post.title;
          this.body = post.body;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updatePost() {
    const post: PostDto = {
      id: this.postId,
      userId: this.userId,
      title: this.title,
      body: this.body
    };

    this.postService.updatePost(post).subscribe({
      next: (response) => {
        console.log('Updated:', response);
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  cancel() {
    this.router.navigate(['/posts']);
  }
}
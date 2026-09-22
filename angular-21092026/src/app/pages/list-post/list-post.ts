import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PostService } from '../../services/postService';

interface PostView {
  id: number;
  title: string;
  body: string;
  author: string;
}

@Component({
  selector: 'app-list-post',
  imports: [],
  templateUrl: './list-post.html',
  styleUrl: './list-post.css'
})
export class ListPost {

  postService = inject(PostService);
  router = inject(Router);

  posts: PostView[] = [];

  loading = signal(true);

  ngOnInit() {
    console.log('ngOnInit called');

    forkJoin({
      postList: this.postService.getPosts(),
      users: this.postService.getUsers()
    }).subscribe({

      next: ({ postList, users }) => {
        this.posts = postList.map(post => {
          const user = users.find(
            user => user.id === post.userId
          );

          return {
            id: post.id,
            title: post.title,
            body: post.body,
            author: user?.username ?? 'Unknown'
          };
        });
        this.loading.set(false);
        console.log(this.loading, this.posts);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editPost(id: number) {
    this.router.navigate(['/edit-post', id]);
  }

  deletePost(id: number) {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter(
          post => post.id !== id
        );
      },

      error: (error) => {
        console.log(error);
      }
    });
  }
}
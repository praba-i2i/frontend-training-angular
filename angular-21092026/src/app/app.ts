import { Component, inject, signal } from '@angular/core';
import { PostService } from './services/postService';
import { forkJoin } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';

export interface PostView {
  id: number;
  title: string;
  body: string;
  author: string;
}


@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  postService = inject(PostService); 

  posts: PostView[] = [];
  loading= signal(true);

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
}

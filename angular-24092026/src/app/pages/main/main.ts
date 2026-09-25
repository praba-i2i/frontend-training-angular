import { Component, inject, signal } from '@angular/core';
import { PostService } from '../../services/postService';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

export interface PostView {
  id: number;
  title: string;
  body: string;
  author: string;
}

@Component({
  imports: [RouterLink],
  selector: 'app-main',
  styleUrl: './main.css',
  templateUrl: './main.html',
})
export class Main {
  postService = inject(PostService); 

  posts: PostView[] = [];
  loading= signal(true);

  ngOnInit() {

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
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { PostService, PostView } from './services/postService';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  postService = inject(PostService);

  posts: PostView[] = [];

  ngOnInit() {
    this.postService.getPosts().subscribe({
      next: (posts) => {

        this.postService.getUsers().subscribe({
          next: (users) => {

            this.posts = posts.map(post => {

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
          },
          error: (error) => {
            console.log(error);
          }
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

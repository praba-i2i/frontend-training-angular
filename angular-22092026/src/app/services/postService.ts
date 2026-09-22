import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PostDto {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface UserDto {
    id: number;
    name: string;
    username: string;
    email: string;
}

@Service()
export class PostService {
    private http =  inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    private userApiUrl = 'https://jsonplaceholder.typicode.com/users';


    getPosts():Observable<PostDto[]> {
        return this.http.get<PostDto[]>(this.apiUrl);
    }

    getUsers(): Observable<UserDto[]> {
        return this.http.get<UserDto[]>(this.userApiUrl);
    }

    addPost(post: Omit<PostDto, 'id'>): Observable<PostDto> {
        return this.http.post<PostDto>(
        this.apiUrl,
        post
        );
    }

    updatePost(post: PostDto): Observable<PostDto> {
        return this.http.put<PostDto>(
        `${this.apiUrl}/${post.id}`,
        post
        );
    }

    deletePost(id: number): Observable<void> {
        return this.http.delete<void>(
        `${this.apiUrl}/${id}`
        );
    }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from './blog.model';
//import POSTS from './post-mock-data';
import { Observable, of } from 'rxjs';
import { map, catchError, } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

const API_URL = `/api`; //URL to web api

export interface PostsResponse {
  data: Post[];
}

export interface PostResponse {
  data: Post;
}

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    const postsUrl = `${API_URL}/posts`;
    return this.http.get<PostsResponse>(postsUrl).pipe(
      map(resp => resp.data),
      catchError(this.handleError('getPosts', []))
    );
  }

  create(post: Post): Observable<Post> {
    const postsUrl = `${API_URL}/posts`;
    return this.http.post<PostResponse>(postsUrl, post).pipe(
      map(resp => resp.data)
      //catchError(this.handleError('createPosts', []))
    );
  }

  // find(id: string): Observable<Post> {
  //   const postUrl = `${API_URL}/posts/${id}`;
  //   return this.http.get<PostsResponse>(postUrl).pipe(
  //     map(resp => resp.data),
  //     catchError(this.handleError)
  //   );
  // }

  update(post: Post): Observable<Post> {
    const postUrl = `${API_URL}/posts/${post.id}`;
    return this.http.put<PostResponse>(postUrl, post).pipe(
      map(resp => resp.data),
      // catchError(this.handleError('getPosts', []))
    );
  }

  delete(id: string): Observable<Post> {
    const postUrl = `${API_URL}/posts/${id}`;
    console.log("service")
    return this.http.delete<PostResponse>(postUrl).pipe(
      map(resp => resp.data)
      // catchError(this.handleError('getPosts', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

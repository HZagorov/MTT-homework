import { Component, OnInit } from '@angular/core';
import POSTS from '../post-mock-data';
import { Post } from '../blog.model';
import {TagInputComponent} from 'angular2-tag-input';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})  
export class PostListComponent implements OnInit {
  posts = POSTS;
  postsList: Post[];
  count: number = POSTS.length;
  selectedPost: Post;
  editedCopy = new Post(new Date(), undefined, undefined,undefined, []);

  editDialogVisibility = false;

  constructor() {
  }

  ngOnInit() {
    this.postsList = POSTS.slice(0, 14);
  }

  editPost(selectedPost: Post) {
    this.editDialogVisibility = true;
    this.selectedPost = selectedPost;
    this.editedCopy = { ... this.selectedPost };
  }

  editSubmitted(post: Post) {
    const index = POSTS.findIndex((ps) => ps.title === this.selectedPost.title);
    POSTS[index] = post;
    this.postsList = POSTS;
    this.editDialogVisibility = false;
  }

  editCanceled() {
    this.editDialogVisibility = false;
  }

  addPost(post: Post): void {
    this.posts.push(post);
  }

 
  onDateSort(event: any) {

    switch (event.target.value) {
      case "asc":
        this.postsList = POSTS.sort((p1, p2) => p1.publicationDate.valueOf() - p2.publicationDate.valueOf());
        break;

      case "desc":
        this.postsList = POSTS.sort((p1, p2) => p2.publicationDate.valueOf() - p1.publicationDate.valueOf());
        break;
    }
    this.postsList = this.postsList.slice(0, 14);
  }


  removePost(post: Post) {
    const index = POSTS.findIndex(ps => ps.title === post.title)
    POSTS.splice(index, 1);
    // this.selectedPost = undefined; 
  
  }

 // selectPost(post: Post) {
  //   this.selectedPost = post;
  // }

}

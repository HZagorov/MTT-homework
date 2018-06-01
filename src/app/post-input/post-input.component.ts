import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import {Post} from '../blog.model';
import POSTS from '../post-mock-data';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css']
})
export class PostInputComponent implements OnInit {
  @Input() post = new Post(new Date(), undefined, undefined,undefined, []);
  @Output() postAdded = new EventEmitter<Post>();
  posts = POSTS;
  @Input() isNewPost  = true;

   @ViewChild('blogForm') form: NgForm;

  constructor() { }

  ngOnInit() {
  }

submitPost(){
  this.postAdded.emit(this.post);
  console.log(this.isNewPost)
  if (this.isNewPost){
  this.posts.push(this.post);
  }
}

resetPost() {
  this.post = new Post(new Date(), undefined, undefined,undefined, []);
  this.form.reset();
}
get diagnostic() { return JSON.stringify(this.post) ;}

// removePost(post : Blog) { //tva e lista
//   const index = TODOS.findIndex(td => td.title === todo.title);
//   TODOS.splice(index, 1);
// }

}

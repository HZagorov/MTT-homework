import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { Post } from '../blog.model';
import POSTS from '../post-mock-data';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css']
})
export class PostInputComponent implements OnInit {
  @Input() post = new Post(undefined, new Date(), undefined, undefined, undefined, []);
  @Output() postEdited = new EventEmitter<Post>();
  @Input() isNewPost = true;  //variable for the edit form
  
  @ViewChild('blogForm') form: NgForm;

  constructor(private postsService: BlogsService, private router: Router) { }

  ngOnInit() { }

  submitPost() {
    if (!this.isNewPost) {  //емитваме за да отразим промяната в списъка, защото той не се зарежда на ново, и записваме промнта в базата
      this.postsService.update({ ...this.post })
        .subscribe(
          post => {
            this.postEdited.emit(post);
          },
      );
    } else {
      // const id = POSTS.reduce((prev, curr) =>
      //   new Post(Math.max(prev.id, curr.id), undefined, undefined, undefined, undefined, [])).id;
      // this.post.id = id + 1;
      this.postsService.create({ ...this.post }).subscribe(
        post => {
          this.router.navigate(['/list']);
        },
      );
    }
  }

  resetPost() {
    this.post = new Post(undefined, new Date(), undefined, undefined, undefined, []);
    this.form.reset();
  }
  get diagnostic() { return JSON.stringify(this.post); }

}

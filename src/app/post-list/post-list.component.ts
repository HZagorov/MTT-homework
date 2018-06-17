import { Component, OnInit } from '@angular/core';
import { Post } from '../blog.model';
import { TagInputComponent } from 'angular2-tag-input';
import { BlogsService } from '../blogs.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[];   //all posts 
  postsList: Post[];  //posts to be displayed
  selectedPost: Post;
  editedCopy = new Post(undefined, new Date(), undefined, undefined, undefined, []);  //passed to post-input for edit

  editDialogVisibility = false;

  constructor(private blogsService: BlogsService) { }

  ngOnInit() {
    this.getPosts();
    this.postsList = this.posts;
    //this.postsList = this.posts.slice(0,14);
  }

  getPosts(): void {  //get posts from server
    this.blogsService.getPosts().subscribe((posts) => this.posts = posts);
  }

  onDateSort(event: any) {
    switch (event.target.value) {
      case "asc":
        this.posts = this.posts.sort((p1, p2) => p1.publicationDate.valueOf() - p2.publicationDate.valueOf());
        break;
      case "desc":
        this.posts = this.posts.sort((p1, p2) => {

          console.log("p1 " + p1.publicationDate.valueOf);
          console.log("p2 " + p2.publicationDate.valueOf);
          return p2.publicationDate.valueOf() - p1.publicationDate.valueOf();
        });

        break;
    }

    // this.posts = this.postsList.slice(0, 14);
  }

  editPost(selectedPost: Post) {  //handle the edit icon click
    this.editDialogVisibility = true;
    this.selectedPost = selectedPost;
    this.editedCopy = { ... this.selectedPost };  //???
  }

  editSubmitted(post: Post) {
    const index = this.posts.findIndex((ps) => ps.title === this.selectedPost.title);   //find the selected post in the array
    this.posts[index] = post;   //submit the editted post in the array at the specified index
    this.postsList = this.posts;  //update the postsList after the edit
    this.editDialogVisibility = false;  //hide the edit dialog 
  }

  editCanceled() {
    this.editDialogVisibility = false;  //hide the dialog when cancel is pressed
  }

  removePost(id: string) {
    console.log("Component")
    this.blogsService.delete(id).subscribe((post) => {
      if (post) {
        console.log("Component Result");
        const index = this.posts.findIndex(ps => ps.id === id);
        this.posts.splice(index, 1);
      }
    });
    // const index = this.posts.findIndex(ps => ps.title === post.title)
    // this.posts.splice(index, 1);  
  }


  // addPost(post: Post): void {
  //   this.posts.push(post);  
  // }

  // selectPost(post: Post) {
  //   this.selectedPost = post;
  // }

}

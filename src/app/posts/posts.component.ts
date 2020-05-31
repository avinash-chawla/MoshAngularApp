import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { BadInput } from './../common/bad-input';

interface PostShape {
  posts: any[]
};

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;
  constructor(private service: PostService) {

  }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(
        (response) => {
          this.posts = response;
        })
  }

  createPost(title) {
    let post: any = { title: title.value }
    title.value = "";
    this.posts.unshift(post);
    this.service.create(post)
      .subscribe((response: any) => {
        post.id = response.id;
      }, (error: AppError) => {
        this.posts.splice(0, 1);

        if (error instanceof BadInput) { }
        // this.forms.setErrors(error.originalError)
        else throw error;
      })
  }

  updatePost(post) {
    this.service.update(post)
      .subscribe((response: any) => {
        console.log(response);
      })
  }

  deletePost(post) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
    this.service.delete(post.id)
      .subscribe((response) => {
        console.log(response);
      }, (error: AppError) => {
        this.posts.splice(index, 0, post);
        if (error instanceof NotFoundError)
          alert("This post has already been deleted");
        else throw error;
      })
  }
}

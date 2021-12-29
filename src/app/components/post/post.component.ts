import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post = {
    comments: [],
    authorId: 0,
    content: '',
    creationDate: '',
    friends: [],
    id: 0,
    image: '',
    likes: [],
    parentId: 0,
    title: ''
  };
  showComments = false;
  constructor() { }

  ngOnInit(): void {
    console.log('this.post');
    
    console.log(this.post);
  }

  click(){
    this.showComments = !this.showComments;
  }
}

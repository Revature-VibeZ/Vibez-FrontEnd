import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Post = {
    authorId: 0,
    comments: [],
    content: '',
    creationDate: '',
    friends: [],
    id: 0,
    image: '',
    likes: [],
    parentId: 0,
    title: ''
  };
  constructor() { }

  ngOnInit(): void {
  }

}

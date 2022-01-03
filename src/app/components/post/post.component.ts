import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';

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

  newContent: String = "";

  showComments = false;
  constructor(private es: EventService, private ps: PostService) { }

  ngOnInit(): void {
    this.es.newPostEvent$.subscribe((res: any) => {
      this.post.comments.push(res)
    })
  }

  click() {
    this.showComments = !this.showComments;
  }

  createComment(parentId: number, comment: String) {
    //get content of form
    console.log(comment)
    // sessionStorage.getItem
    //make a post request to add a new post
    let body = {
      content: comment,
      parentId
    }
    this.ps.create(body).subscribe((res: any) => {
      this.es.newPost(res);
    })
    //if post succeeds update page to show comment
  }
}

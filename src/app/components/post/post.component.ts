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

  @Input() showComments = false;

  content: String = "";

  constructor(private es: EventService, private ps: PostService) { }

  ngOnInit(): void {
    this.es.newPostEvent$.subscribe((res: any) => {
      this.post.comments.push(res)
    })
  }

  click(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    //should stop child comments from showing but doesn't
    this.showComments = !this.showComments;
  }

  createComment(parentId: number, comment: String) {
    if(!comment) return;
    if(!parentId) return;
    let body = {
      content: comment,
      parentId
    }
    this.ps.create(body).subscribe((res: any) => {
      //if post succeeds update page to show comment
      this.es.newPost(res);
    })
  }
  createLike(postId: number) {
    alert("button is working");    
    this.ps.sendLike(postId).subscribe((res: any) => {
      //if post succeeds update page to show comment
      this.es.newPost(res);
    })
  }
}

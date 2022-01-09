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

  isLiked: boolean = false;
  constructor(private es: EventService, private ps: PostService) { }

  ngOnInit(): void {
    // (this.post.likes[0]['username']);
    for (var val of this.post.likes) {
      if (val['username'] == sessionStorage.getItem('userToken')) {
        this.isLiked = true;
      }
    }
    this.es.newPostEvent$.subscribe((res: any) => {
      if (this.post.id !== res.parentId) return;
      this.showComments = true;
      res.likes = [];
      this.post.comments.push(res)
    })
    this.es.newLikeEvent$.subscribe((res: any) => {
      if (this.post.id !== res.postId) return;
      this.isLiked = true;
      this.post.likes.push(res)
    })
    this.es.deleteLikeEvent$.subscribe((confirmedDeletedId: number) => {      
      let copy = this.post.likes;
      for (let i = 0; i < copy.length; i++) {
        let like = copy[i];
        if(confirmedDeletedId === like.id){
          this.post.likes.splice(i, 1);
          this.isLiked = !this.isLiked;
        }
      }
    })
  }

  click(e: Event) {
    this.stopClickPropagation(e);
    this.showComments = !this.showComments;
  }

  stopClickPropagation(e: Event) {
    e.stopPropagation();
    e.preventDefault();
  }

  createComment(parentId: number, comment: String) {
    if (!comment) return;
    if (!parentId) return;
    let body = {
      content: comment,
      parentId
    }
    this.ps.create(body).subscribe((res: any) => {
      //if post succeeds update page to show comment
      this.es.newPost(res);
    })
  }

  createLike(postId: number, e: Event) {
    this.stopClickPropagation(e);
    if(this.isLiked){
      this.ps.deleteLike(postId).subscribe((res: any) => {
        //if like succeeds update page to show number of likes
        this.es.deleteLike(res);
      })
    } else {
      this.ps.sendLike(postId).subscribe((res: any) => {
        //if like succeeds update page to show number of likes
        this.es.newLike(res, postId);
      })
    }
  }
}

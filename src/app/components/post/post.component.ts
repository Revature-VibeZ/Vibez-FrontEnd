import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post = {
    comments: [],
    author: {},
    content: '',
    creationDate: '',
    friends: [],
    id: 0,
    image: '',
    likes: [],
    parentId: 0,
    title: '',
  };
  @Input() showComments = false;
  @Input() showReplyForm = false;

  content: String = "";
  numberOfNestedReplies = 0;
  isLiked: boolean = false;
  constructor(private es: EventService, private ps: PostService, private us: UserService, private router: Router) { }

  ngOnInit(): void {
    this.numberOfNestedReplies = this.recursiveCountReplies(this.post.comments);
    for (let val of this.post.likes) {
      if (val['username'] == sessionStorage.getItem('userToken')) {
        this.isLiked = true;
      }
    }
    this.es.newPostEvent$.subscribe((res: Post) => {
      if (this.post.id !== res.parentId) return;
      this.showComments = true;
      this.numberOfNestedReplies += 1;
      this.post.comments.push(res);
    })
    this.es.newLikeEvent$.subscribe((res: any) => {
      if (this.post.id !== res.postId) return;
      console.log('res: ', res);
      console.log('this.post.likes: ', this.post.likes);
      
      this.isLiked = true;
      this.post.likes.push(res)
      console.log(this.post.likes);

    })
    this.es.deleteLikeEvent$.subscribe((confirmedDeletedId: number) => {      
      let copy = this.post.likes;
      console.log(copy);
      
      for (let i = 0; i < copy!.length; i++) {
        let like = copy![i];
        console.log(like);
        
        if(confirmedDeletedId === like.id){
          console.log('made it');
          console.log(this.isLiked);
          
          this.isLiked = false;
          console.log(this.isLiked);
          console.log(this.post.likes);
          
          this.post.likes!.splice(i, 1);
          console.log(this.post.likes);

        }
      }
    })
  }

  recursiveCountReplies(replies: Post[]): number{
    let count = 0;
    for(let reply of replies){
      if(reply.comments.length === 0) return count += 1;    
      count += this.recursiveCountReplies(reply.comments) + 1;
    }
    return count;
  }
  
  click(e: Event) {
    this.stopClickPropagation(e);
    this.showComments = !this.showComments;
  }
  
  toggleReply(e: Event) {
    this.stopClickPropagation(e);
    this.showReplyForm = !this.showReplyForm;
  }
  
  loadProfile(username: string) {
    this.us.getUserByUsername(username).subscribe((res: any) => {
      this.es.searchProfile(res);
      this.router.navigate(['/profile']);
    });
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
    this.ps.createReply(body).subscribe((res: any) => {
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
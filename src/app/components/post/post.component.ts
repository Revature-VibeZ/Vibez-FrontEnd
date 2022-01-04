import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  template: 
  `<ng-container>
    <div class="onepost" (click)="click($event)">
        <div>Title: {{post.title}}</div>
        <div>Content: {{post.content}}</div>
        <div>Created: {{post.creationDate}}</div>
        <form>
            <div class="form-group">
                <label for="exampleFormControlTextarea1"></label>
                <textarea ng-click="$event.stopPropagation" style="z-index: 1000;" class="form-control" type="text" id="exampleFormControlTextarea1" rows="3" [(ngModel)]="content" name="content">Add a comment...</textarea>
            </div>
            <button class="btn btn-primary" (click)="createComment(post.id, content)">Post</button>
        </form>
        <div *ngIf="showComments && post.comments.length > 0">
            <div style="border: 10px solid blue;" *ngFor="let comment of post.comments">
                <app-post [showComments]="true" [post]="comment"></app-post>
            </div>
        </div>
    </div>
  </ng-container>`,
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
    console.log('click got triggered!!');

    console.log(e);
    console.log(e.target);
    console.log(this.post.comments);
    console.log(this.post.comments.length);

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

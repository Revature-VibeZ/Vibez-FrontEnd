import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
//This function gets all posts and displays it on screen for the user to interact with.
export class PostFeedComponent implements OnInit {
  posts: any = [];

  constructor(private ps: PostService, private es: EventService) { }

  ngOnInit(): void {    
    this.ps.getAll().subscribe(_ => {      
      this.posts = this.ps.posts;
    });
    this.es.newPostEvent$.subscribe((res: Post) => {      
      res.likes = [];
      res.comments = [];
      if(!res.parentId) this.posts.push(res);
    })
  }

  scroll(){
    window.scroll(0,0);
  }
}

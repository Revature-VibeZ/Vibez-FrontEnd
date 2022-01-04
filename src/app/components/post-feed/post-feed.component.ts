import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  posts: any = [];

  constructor(private ps: PostService) { }

  ngOnInit(): void {    
    this.ps.getAll().subscribe(_ => {
      this.posts = this.ps.posts;
    });
  }
}

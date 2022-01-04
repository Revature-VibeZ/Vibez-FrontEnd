import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  posts: any = [1,2,3,4,5];

  constructor(private ps: PostService) { }

  ngOnInit(): void {
    this.posts = this.ps.getAll()
  }

  
}

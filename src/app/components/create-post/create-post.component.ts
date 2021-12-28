import { Component, OnInit } from '@angular/core';
import { PostServiceService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private PostService: PostServiceService) { }

  ngOnInit(): void {
  }

  createPost(post: string){
    this.PostService.sendPost(post).subscribe((response: any) => {

  },
  err => {
    alert("err");
    ;
  }  
  );
  }
}

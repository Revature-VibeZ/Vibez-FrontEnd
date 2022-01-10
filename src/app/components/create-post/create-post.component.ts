import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  file : File | undefined;

  constructor(private postService: PostService) { }
// This component contains logic for creating posts and sending it to the backend for processing.
  ngOnInit(): void {
  }

  createPost(post: string){
    this.postService.sendPost(post, this.file!).subscribe((response: any) => {

  },
  err => {
    alert("err");
    
  }  
  );
  }

  onFileSelected(event: any) {

    const Uploadedfile:File = event.target.files[0];

    if (Uploadedfile) {   
      this.file = Uploadedfile;        
    }
}

}

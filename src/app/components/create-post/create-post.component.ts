import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'src/app/models/Post';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  file?: File;
  filePath: any;
  myForm: any;
  content: any;
  post: Post = {
    author: {username: ""},
    content: '',
    title: '',
    comments: [],
    creationDate: '',
    friends: [],
    likes: [],
    parentId: null
  }

// This component contains logic for creating posts and sending it to the backend for processing.
  
  constructor(private postService: PostService, private fb: FormBuilder, private es: EventService) {
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    })
  }

  ngOnInit(): void {
  }

  createPost(post: Post, file: File) {  
    this.postService.createTopLevelPost(post, file).subscribe((response: any) => {
      this.es.newPost(response);
      this.post.title="";
      this.post.content="";
      this.clearImagePreview();
    },
      err => {
      }
    );
  }

  onFileSelected(event: any) {
    const Uploadedfile: File = event.target.files[0];
    if (Uploadedfile) {
      this.file = Uploadedfile;
    }
  }

  imagePreview(e: any) {
    let file = e.target.files[0];
    this.file = file;

    this.myForm.patchValue({
      img: file
    });

    this.myForm.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  clearImagePreview(){
    //low priority bug: doesn't clear out file name after adding post
    let test = document.getElementById('inputGroupFile01') as HTMLElement;
    test.nodeValue = null;
    this.file = undefined;

    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    })

    this.myForm.get('img').updateValueAndValidity()
    this.filePath = undefined;
  }

}

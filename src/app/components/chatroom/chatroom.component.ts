import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatService } from 'src/app/services/chat.service';

declare function connect(chatroomurl: string): void;
declare function sendMessage(usrname : string): void;
declare function addMessage(msg : string): void;
declare function dragElement(element: Element): void;

// This component is responsible for setting up the chatroom function. It will create a websocket which will allow a user to send and receive messages.
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {  
  chatHistory? : string[];
  chatIsHidden = true;
  chatDisplay = "Chat Room";
  constructor(private ChatService: ChatService) { }

  ngOnInit(): void {
    dragElement(document.getElementById("mydiv")!);
    var chatroomurl:string = environment.API_URL + '/chatroom';
    this.getHistory();
    connect(chatroomurl);
  }

  getHistory() {
    this.ChatService.getChatHistory().subscribe((response: any) => {this.chatHistory = response;     
      for (var val of this.chatHistory!) {  
        addMessage(val);         
      }
    })
    }
  
  sendMsg(){
    sendMessage(sessionStorage.getItem('userToken') || "Guest");
    (<HTMLInputElement>document.getElementById("name")).value = "";

  }
  openChat(){
    if (this.chatIsHidden == true) {
    document.getElementById('mydiv')!.hidden = false;
    this.chatIsHidden = false;
    this.chatDisplay = "Hide Chat";
    }
    else {
      document.getElementById('mydiv')!.hidden = true;
      this.chatIsHidden = true;
      this.chatDisplay = "Show Chat";

    }
  }
  connectBtn() {
    var chatroomurl:string = environment.API_URL + '/chatroom';
    connect(chatroomurl);
  }


}
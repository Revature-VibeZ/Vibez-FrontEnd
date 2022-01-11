import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn: any;
  constructor() { }
// This home page makes a check to see if user is logged in via checking session storage token, if not it prompts guest to log in. 
  ngOnInit(): void {
    this.loggedIn = sessionStorage.getItem('userToken');
  }
}

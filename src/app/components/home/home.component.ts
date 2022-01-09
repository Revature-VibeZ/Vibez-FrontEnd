import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn: any;
  constructor() { }

  ngOnInit(): void {
    this.loggedIn = sessionStorage.getItem('userToken');
  }
}

import { Component, OnInit } from '@angular/core';
import { ApirequestService } from 'src/app/api/apirequest.service';
import { HttpHeaders } from '@angular/common/http';
//import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-autotest',
  templateUrl: './autotest.component.html',
  styleUrls: ['./autotest.component.scss']
})

export class AutotestComponent implements OnInit {

  apiBaseUrl:string = "https://jsonplaceholder.typicode.com/todos?_limit=5";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type':'application/json'
    })
  }

  constructor(private apiService:ApirequestService) { 
    
    this.apiService.get(this.apiBaseUrl).subscribe(i => {
      console.log(i);
    });

    this.apiService.get(this.apiBaseUrl,this.httpOptions).subscribe(i => {
      console.log(i);
    });

  }

  ngOnInit() {

  }

}

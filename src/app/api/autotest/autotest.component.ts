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
    
    // GET request testing done here (URL is required with httpOptions is optional)
    this.apiService.get(this.apiBaseUrl).subscribe(i => {
      console.log(i);
    });
    this.apiService.get(this.apiBaseUrl,this.httpOptions).subscribe(i => {
      console.log(i);
    });

    // POST request testing done here (URL and BODY DATA is required but httpOptions is optional)
    this.apiService.post(this.apiBaseUrl,{id:1,title:"hey",completed:true}).subscribe(i => {
      console.log(i);
    })
    this.apiService.post(this.apiBaseUrl,{id:1,title:"hey",completed:true},this.httpOptions).subscribe(i => {
      console.log(i);
    })

  }

  ngOnInit() {

  }

}

import { Component, OnInit } from '@angular/core';
import { AutoTestGetService } from 'src/app/services/test/auto-test-get.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-autotest',
  templateUrl: './autotest.component.html',
  styleUrls: ['./autotest.component.scss']
})

export class AutotestComponent implements OnInit {

  url:string = "https://jsonplaceholder.typicode.com/todos";
  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  });
  result:string[] = [];

  constructor(private testService:AutoTestGetService) {
    testService.testGet(this.url,this.httpHeaders).then(x=>{
      x.forEach(element => {
        console.log(element);
      });
    });
  }

  ngOnInit() {

  }

}

import { HttpHeaders } from '@angular/common/http';
import { AutoTestPostService } from './../../services/test/auto-test-post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autotest',
  templateUrl: './autotest.component.html',
  styleUrls: ['./autotest.component.scss']
})

export class AutotestComponent implements OnInit {

  constructor(private autoPost:AutoTestPostService) {
    autoPost.testPost('https://jsonplaceholder.typicode.com/todos',['id','title','completed'],['^[0-9]{1-3}$',
  '^[a-zA-Z]+$','^[a-z]+$'],new HttpHeaders({'Content-Type':'application/json'}),['id','title'],'id','201');
   }

  ngOnInit() {

  }

}

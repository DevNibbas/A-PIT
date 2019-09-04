import { AutomatedTestService } from './../../services/test/automated-test.service';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';;

@Component({
  selector: 'app-autotest',
  templateUrl: './autotest.component.html',
  styleUrls: ['./autotest.component.scss']
})

export class AutotestComponent implements OnInit {

  object:any = {};

  constructor(private automatedTest:AutomatedTestService) {
      this.object.url = 'https://jsonplaceholder.typicode.com/posts';
      this.object.httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
      this.object.paramNames = ['id','title','completed','created_by'];
      this.object.paramOptional = ['id'];
      this.object.resultName = 'id';
      this.object.resultVal = '101';
      this.object.paramRegex = ['^[0-9]{1-3}$','^[a-zA-Z]+$','^[a-z]+$','^[a-zA-Z0-9]+$']
      this.object.data = {title:'Head',completed:true,created_by:'jack1806'};
      console.log(automatedTest.test('GET',this.object));
      console.log(automatedTest.test('POST',this.object));
      this.object.url = `${this.object.url}/1`;
      console.log(automatedTest.test('PUT',this.object));
   }

  ngOnInit() {

  }

}

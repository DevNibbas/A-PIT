import { Param } from './../interface/Param';
import { Apirequest } from './../interface/Apirequest';
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
  request:Apirequest = new Apirequest();
  result:any = {};
  response:string[] = [];
  pass:number = 0;
  resultDetails:any[] = [];

  constructor(private automatedTest:AutomatedTestService) {
    this.request.method = 'GET';
    this.request.params = [new Param];
    this.request.headers = [{ name: 'Access-Control-Request-Origin', value: '*' } as any, {}];
    this.request.datas = [{} as any];
      // this.object.url = 'https://jsonplaceholder.typicode.com/posts';
    
      // this.object.url = 'https://sms-system-api.herokuapp.com/add-leave';
      // this.object.paramNames = ['from','reason','sender_id','till','to_number'];
      // this.object.paramRegex = ['^[a-zA-Z]+$','^[a-zA-Z]+$','^16BCB0048$','^[a-zA-Z]+$','^9423867235$'];

      // this.object.httpHeaders = new HttpHeaders({'Content-Type':'application/json',
      //   'Access-Control-Allow-Origin':'*'});
      // this.object.paramNames = ['id','title','completed','created_by'];
      // this.object.paramOptional = ['id','title','completed','created_by'];
      // this.object.paramRegex = ['^[0-9]{1-3}$','^[a-zA-Z]+$','^[a-z]+$','^[a-zA-Z0-9]+$']
      // this.object.data = {title:'Head',completed:true,created_by:'jack1806'};
      //console.log(automatedTest.test('GET',this.object));
      // console.log(automatedTest.test('POST',this.object));
      //this.object.url = `${this.object.url}/1`;
      //console.log(automatedTest.test('PUT',this.object));
   }

  ngOnInit() {
  }

  addParam(index) { // ui part
    if (index === this.request.params.length - 1) {
      this.request.params.push(new Param());
    }
  }
  addHeader(index) { // ui part
    if (index === this.request.headers.length - 1) {
      this.request.headers.push({});
    }
  }
  addData(index) { // ui part
    if (index === this.request.datas.length - 1) {
      this.request.datas.push({} as any);
    }
  }

  tweakUiAfterUrlChanged() {
    this.response = undefined;
    this.pass = 0;
  }

  sendReq() {
    const option = {
      headers: this.request.getHeaders(),
      params: this.request.getParams(),
      observe: 'response',
      reportProgress: this.request.reportProgress ? this.request.reportProgress : false,
      responseType: 'json',
    };
    this.response = this.automatedTest.test(this.request,option);
    console.log(this.response);
    // this.req.unireq(this.request.method, this.request.url, option, this.request.getDatas()).subscribe(x => {
    //   console.log(x);
    //   this.response = x;
    //   const ele = document.getElementById('jsonResponse');
    //   ele.innerHTML = this.req.library.json.prettyPrint(this.response.body);
    //   const eleHeader = document.getElementById('jsonResponseHeader');
    //   eleHeader.innerHTML = this.req.library.json.prettyPrint(this.req.getHeadersInJson(this.response.headers));

    // });
  }

  getPassValues():number{
    let ret = 0;
    this.resultDetails = [];
    this.response.forEach(x => {
<<<<<<< HEAD
      let tmp = x.split(':');
      let obj = {casenum:tmp[0],result:tmp[1],details:tmp[2],status:tmp[3]};
      this.resultDetails.push(obj);
=======
      let tmp = x.split(' : ');
>>>>>>> Changes made.
      console.log(tmp);
      if(x.includes('pass'))
      ret += 1;
    });
    return ret;
  }

}

import { IDBContract } from '../interface/IDBContract';
import { CrudService } from './../../crud.service';
import { Param } from './../interface/Param';
import { Apirequest } from './../interface/Apirequest';
import { AutomatedTestService } from './../../services/test/automated-test.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-autotest',
  templateUrl: './autotest.component.html',
  styleUrls: ['./autotest.component.scss']
})

export class AutotestComponent implements OnInit {

  object: any = {};
  // request: Apirequest = new Apirequest();
  result: any = {};
  response: string[] = undefined;
  pass = 0;
  resultDetails: any[] = [];
  displayResults = false;

  constructor(private automatedTest: AutomatedTestService, public request: Apirequest,
    private idbCRUD: CrudService) {
    this.request.method = 'GET';
    this.request.params = [{} as any];
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
    // console.log(automatedTest.test('GET',this.object));
    // console.log(automatedTest.test('POST',this.object));
    // this.object.url = `${this.object.url}/1`;
    // console.log(automatedTest.test('PUT',this.object));
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
    this.response = [];
    this.pass = 0;
    this.displayResults = false;
    this.resultDetails = [];
  }

  sendReq() {
    this.tweakUiAfterUrlChanged();
    const option = {
      headers: this.request.getHeaders(),
      params: this.request.getParams(),
      observe: 'response',
      reportProgress: this.request.reportProgress ? this.request.reportProgress : false,
      responseType: 'json',
    };
    const obj: any = {};
    obj[IDBContract._tReqHistoryIndexUserId] = 1;
    obj[IDBContract._tReqHistoryIndexMethod] = this.request.method;
    obj[IDBContract._tReqHistoryIndexURL] = this.request.url;
    obj[IDBContract._tReqHistoryIndexParams] = this.request.getParams();
    obj[IDBContract._tReqHistoryIndexHeaders] = this.request.getHeaders();
    obj[IDBContract._tReqHistoryIndexData] = this.request.getDatas();
    // obj[IDBContract._tReqHistoryAuth] = 1;
    // obj[IDBContract._tReqHistoryAuthType] = 1;
    // obj[IDBContract._tReqHistoryAuthUname] = 1;
    // obj[IDBContract._tReqHistoryAuthPwd] = 1;
    // obj[IDBContract._tReqHistoryBearerToken] = 1;

    console.log(this.idbCRUD.addRequestHistory(obj));
    const history = this.idbCRUD.getRequestHistory(1);
    history.then(res => {
      console.log(res);
    });
    this.response = this.automatedTest.test(this.request, option);
    // let x = new Promise<string[]>((res,rej)=>{
    //   res(this.automatedTest.test(this.request,option));
    // });
    // x.then(x=>{
    //   console.log(x.length);
    //   this.response = x;
    //   console.log('in');
    //   this.getPassValues();
    //   this.displayResults = true;
    //   console.log(this.response.length);
    // });
    console.log('out');
    // this.req.unireq(this.request.method, this.request.url, option, this.request.getDatas()).subscribe(x => {
    //   console.log(x);
    //   this.response = x;
    //   const ele = document.getElementById('jsonResponse');
    //   ele.innerHTML = this.req.library.json.prettyPrint(this.response.body);
    //   const eleHeader = document.getElementById('jsonResponseHeader');
    //   eleHeader.innerHTML = this.req.library.json.prettyPrint(this.req.getHeadersInJson(this.response.headers));

    // });
  }

  getPassValues() {
    let ret = 0;
    this.resultDetails = [];
    console.log(this.response.length);
    this.response.forEach(x => {
      const tmp = x.split(':');
      const obj = { casenum: tmp[0], result: tmp[1], details: tmp[2], status: tmp[3] };
      this.resultDetails.push(obj);
      if (x.includes('pass')) {
        ret += 1;
      }
    });
    this.pass = ret;
    this.displayResults = true;
    return this.resultDetails;
  }

}

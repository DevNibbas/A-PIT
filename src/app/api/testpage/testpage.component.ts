import { ReqHistory } from './../interface/ReqHistory';
import { HistIDBContract } from './../interface/HistIDBContract';
import { CrudService } from './../../crud.service';
import { ApirequestService } from 'src/app/api/apirequest.service';
import { Component, ElementRef } from '@angular/core';
import { Apirequest } from './../interface/Apirequest';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})

export class TestpageComponent {

  request: Apirequest = new Apirequest();
  response;
  library: any = {} as any;
  uioptions: any = { auth: false, authtype: null, cors: false } as any;
  apiAuth: any = {} as any;

  allHistory: any[] = [] as any;
  saverequest = {} as any;

  constructor(private req: ApirequestService, private ele: ElementRef, private db: CrudService) {
    this.request.method = 'GET';
    this.request.params = [{} as any];
    this.request.headers = [{ key: 'Access-Control-Request-Origin', value: '*' } as any, {}];
    this.request.datas = [{} as any];




  }

  tweakUiAfterUrlChanged() {
    this.response = undefined;
    document.getElementById('jsonResponse').innerHTML = '';
    document.getElementById('jsonResponseHeader').innerHTML = '';

  }

  sendReq() {
    let url = this.request.url;
    if (this.uioptions.auth && this.uioptions.authtype === 'Basic Authentication') {
      this.request.headers.push({ key: 'Authentication', value: 'Basic ' + btoa(this.apiAuth.username + ':' + this.apiAuth.password) });
      this.request.headers.push({ key: 'Authorization', value: 'Basic ' + btoa(this.apiAuth.username + ':' + this.apiAuth.password) });

    } else if (this.uioptions.authtype === 'Bearer Token Authentication') {
      this.request.headers.push({ key: 'Authentication', value: 'Bearer ' + this.apiAuth.bearer });
      this.request.headers.push({ key: 'Authorization', value: 'Bearer ' + this.apiAuth.bearer });

    }
    if (this.uioptions.cors === true) {
      console.log('cors');
      url = 'http://127.0.0.1:8000/' + this.request.url;
    }
    const option = {
      headers: this.request.getHeaders(),
      params: this.request.getParams(),
      observe: 'response',
      reportProgress: this.request.reportProgress ? this.request.reportProgress : false,
      responseType: 'json',
    };

    this.req.unireq(this.request.method, url, option, this.request.getDatas()).subscribe(x => {
      this.response = x;
      const ele = document.getElementById('jsonResponse');
      // ele.innerHTML = this.req.library.json.prettyPrint(this.response.body);
      // removed due to scalability factor please update this algorithm
      ele.innerHTML = JSON.stringify(this.response.body, null, 3);

      // ele.innerHTML = JSON.stringify(this.response.body);
      const eleHeader = document.getElementById('jsonResponseHeader');
      eleHeader.innerHTML = this.req.library.json.prettyPrint(this.req.getHeadersInJson(this.response.headers));


      // save request
      this.saverequest[HistIDBContract._tReqHistoryIndexUserId] = 1;
      this.saverequest[HistIDBContract._tReqHistoryIndexURL] = this.request.url;
      this.saverequest[HistIDBContract._tReqHistoryIndexParams] = this.request.params;
      this.saverequest[HistIDBContract._tReqHistoryIndexMethod] = this.request.method;
      this.saverequest[HistIDBContract._tReqHistoryIndexHeaders] = this.request.headers;
      this.saverequest[HistIDBContract._tReqHistoryIndexData] = this.request.datas;
      this.saverequest[HistIDBContract._tReqHistoryIndexBearerToken] = this.apiAuth.bearer;
      this.saverequest[HistIDBContract._tReqHistoryIndexAuthUname] = this.apiAuth.username;
      this.saverequest[HistIDBContract._tReqHistoryIndexAuthPwd] = this.apiAuth.password;
      this.saverequest[HistIDBContract._tReqHistoryIndexAuth] = this.uioptions.auth;
      this.saverequest[HistIDBContract._tReqHistoryIndexAuthType] = this.uioptions.authtype;




      this.db.addRequestHistory(this.saverequest);
      const result = this.db.getRequestHistory(1);
      result.onsuccess = (e) => {
        console.log(result.result);
        this.allHistory = result.result;
      };

    });
  }



}

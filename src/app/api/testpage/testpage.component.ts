import { IDBContract } from './../interface/IDBContract';
import { CrudService } from './../../crud.service';
import { ApirequestService } from 'src/app/api/apirequest.service';
import { Component, ElementRef } from '@angular/core';
import { Apirequest } from './../interface/Apirequest';
import { AuthService } from 'src/app/auth/auth.service';

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
  user;
  allHistory: any[] = [] as any;
  saverequest = {} as any;


  errors: any = [] as any;

  activatedHistory;

  constructor(private req: ApirequestService, private ele: ElementRef, private db: CrudService, private auth: AuthService) {
    this.user = JSON.parse(localStorage.getItem('userid'));
    this.request.method = 'GET';
    this.request.params = [{} as any];
    this.request.headers = [{ key: 'Access-Control-Request-Origin', value: '*' } as any, {}];
    this.request.datas = [{} as any];

    const history = this.getHistory(this.user[0]);
    history.onsuccess = () => {
      this.allHistory = history.result;
      console.log(this.allHistory);
    };




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
      this.saverequest[IDBContract._tReqHistoryIndexUserId] = this.user[0];
      this.saverequest[IDBContract._tReqHistoryIndexURL] = this.request.url;
      this.saverequest[IDBContract._tReqHistoryIndexParams] = this.request.params;
      this.saverequest[IDBContract._tReqHistoryIndexMethod] = this.request.method;
      this.saverequest[IDBContract._tReqHistoryIndexHeaders] = this.request.headers;
      this.saverequest[IDBContract._tReqHistoryIndexData] = this.request.datas;
      this.saverequest[IDBContract._tReqHistoryIndexBearerToken] = this.apiAuth.bearer;
      this.saverequest[IDBContract._tReqHistoryIndexAuthUname] = this.apiAuth.username;
      this.saverequest[IDBContract._tReqHistoryIndexAuthPwd] = this.apiAuth.password;
      this.saverequest[IDBContract._tReqHistoryIndexAuth] = this.uioptions.auth;
      this.saverequest[IDBContract._tReqHistoryIndexAuthType] = this.uioptions.authtype;




      this.db.addRequestHistory(this.saverequest).then(id => {
        this.saverequest.id = id;
        this.allHistory.push(this.saverequest);
        this.saverequest = {} as any;

      });

    });
  }

  getHistory(uid): IDBRequest<any> {
    if (!this.db.isDBOpened()) {
      return null as IDBRequest;
    } else {
      return this.db.getRequestHistory(uid);
    }
  }


  activateHistoryList(index) {
    if (this.activatedHistory === this.allHistory[index].id) {
      this.activatedHistory = undefined;
    } else {
      this.activatedHistory = this.allHistory[index].id;
    }
  }
  deactivateHistoryList(index) {
    this.activatedHistory = undefined;
  }
}

import { IDBContract } from './../interface/IDBContract';
import { CrudService } from './../../crud.service';
import { ApirequestService } from 'src/app/api/apirequest.service';
import { Component, ElementRef } from '@angular/core';
import { Apirequest } from './../interface/Apirequest';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { History } from '../interface/History';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})

export class TestpageComponent {

  request: Apirequest = new Apirequest();
  errors: any = [] as any;
  constructor(private req: ApirequestService, private ele: ElementRef, private db: CrudService, private auth: AuthService,
    public history: History) {
  }

  tweakUiAfterUrlChanged() {
    this.request.response = undefined;
    document.getElementById('jsonResponse').innerHTML = '';
    document.getElementById('jsonResponseHeader').innerHTML = '';

  }

  sendReq() {
    this.request.getAuthIfEnabled();
    this.request.getOptions();
    this.request.CheckForCors();
    this.req.unireq(this.request.method, this.request.typeCastedUrl, this.request.options, this.request.getDatas()).subscribe(res => {
      this.request.response = res;
      const ele = document.getElementById('jsonResponse');
      ele.innerHTML = JSON.stringify(this.request.response.body, null, 3);
      const eleHeader = document.getElementById('jsonResponseHeader');
      eleHeader.innerHTML = this.req.library.json.prettyPrint(this.req.getHeadersInJson(this.request.response.headers));

      // save request
      const savereq = this.request.parseToDb();
      this.history.saveHistory(savereq);

    });
  }




}

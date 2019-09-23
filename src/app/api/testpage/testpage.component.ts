import { IDBContract } from './../interface/IDBContract';
import { CrudService } from './../../crud.service';
import { ApirequestService } from 'src/app/api/apirequest.service';
import { Component, ElementRef } from '@angular/core';
import { Apirequest } from './../interface/Apirequest';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { History } from '../interface/History';
import { EnvService } from 'src/app/services/api/env.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})

export class TestpageComponent {

  // request: Apirequest = new Apirequest();
  errors: any = [] as any;
  Json = JSON;

  constructor(private req: ApirequestService, private ele: ElementRef, private db: CrudService, private auth: AuthService,
    public history: History, public request: Apirequest) {
  }

  tweakUiAfterUrlChanged() {
    this.request.response = undefined;
    document.getElementById('jsonResponse').innerHTML = '';
    document.getElementById('jsonResponseHeader').innerHTML = '';

  }


  sendReq() {
    const ele = document.getElementById('jsonResponse');
    const eleHeader = document.getElementById('jsonResponseHeader');

    // this.request.parseEnv().then(res => {

    this.request.getAuthIfEnabled();
    this.request.getOptions();

    this.request.CheckForCors();

    this.req.unireq(this.request.method, this.request.typeCastedUrl, this.request.options, this.request.getDatas()).subscribe(res => {
      this.request.response = res;
      ele.innerHTML = JSON.stringify(this.request.response.body, null, 3);
      eleHeader.innerHTML = this.req.library.json.prettyPrint(this.req.getHeadersInJson(this.request.response.headers));

      // save request
      const savereq = this.request.parseToDb();
      this.history.saveHistory(savereq);

    },
      error => {
        console.log(error);
        if (error) {
          this.request.response = error;
          eleHeader.innerHTML = '<div style="color:#B00020;">' + JSON.stringify(
            { error: 'Something Went Wrong (this header is a custom set by this app) ' }, null, 3) + '</div>';

          ele.innerHTML = '<div style="color:#B00020;">' +
            error.message + '\nSuggestion: May be the error is due to cors policy try enabling cors while sending request' + '</div>';

        }
      });


    // });
  }




}

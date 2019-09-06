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
  uioptions: any = { auth: false } as any;


  constructor(private req: ApirequestService, private ele: ElementRef) {
    this.request.method = 'GET';
    this.request.params = [{} as any];
    this.request.headers = [{ name: 'Access-Control-Request-Origin', value: '*' } as any, {}];
    this.request.datas = [{} as any];
  }

  tweakUiAfterUrlChanged() {
    this.response = undefined;
    document.getElementById('jsonResponse').innerHTML = '';
    document.getElementById('jsonResponseHeader').innerHTML = '';

  }

  sendReq() {
    const option = {
      headers: this.request.getHeaders(),
      params: this.request.getParams(),
      observe: 'response',
      reportProgress: this.request.reportProgress ? this.request.reportProgress : false,
      responseType: 'json',
    };

    this.req.unireq(this.request.method, this.request.url, option, this.request.getDatas()).subscribe(x => {
      this.response = x;
      const ele = document.getElementById('jsonResponse');
      // ele.innerHTML = this.req.library.json.prettyPrint(this.response.body);
      // removed due to scalability factor please update this algorithm
      ele.innerHTML = JSON.stringify(this.response.body, null, 3);
      const eleHeader = document.getElementById('jsonResponseHeader');
      eleHeader.innerHTML = this.req.library.json.prettyPrint(this.req.getHeadersInJson(this.response.headers));

    });
  }



}

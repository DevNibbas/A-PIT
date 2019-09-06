import { ApirequestService } from 'src/app/api/apirequest.service';
import { Param } from './../interface/Param';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Apirequest } from './../interface/Apirequest';
import { HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})
export class TestpageComponent implements OnInit {


  request: Apirequest = new Apirequest();
  response;
  library: any = {} as any;

  uioptions: any = {} as any;

  // @ViewChild('jsonResponse', { static: false }) jsonResponse: ElementRef;
  constructor(private req: ApirequestService, private ele: ElementRef) {
    this.request.method = 'GET';
    this.request.params = [{} as any];
    console.log(this.response);

    this.request.headers = [{ name: 'Access-Control-Request-Origin', value: '*' } as any, {}];
    this.request.datas = [{} as any];
    // this.request.headers[0].append()





  }





  tweakUiAfterUrlChanged() {
    this.response = undefined;
    document.getElementById('jsonResponse').innerHTML = '';
    document.getElementById('jsonResponseHeader').innerHTML = '';

  }



  sendReq() {
    console.log(this.request);
    const option = {
      headers: this.request.getHeaders(),
      params: this.request.getParams(),
      observe: 'response',
      reportProgress: this.request.reportProgress ? this.request.reportProgress : false,
      responseType: 'json',
    };

    this.req.unireq(this.request.method, this.request.url, option, this.request.getDatas()).subscribe(x => {
      console.log(x);
      this.response = x;
      const ele = document.getElementById('jsonResponse');
      ele.innerHTML = this.req.library.json.prettyPrint(this.response.body);
      const eleHeader = document.getElementById('jsonResponseHeader');
      eleHeader.innerHTML = this.req.library.json.prettyPrint(this.req.getHeadersInJson(this.response.headers));

    });
  }


  ngOnInit() {
  }

}

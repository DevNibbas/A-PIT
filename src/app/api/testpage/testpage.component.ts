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
    this.request.params = [new Param()];
    console.log(this.response);

    this.request.headers = [{ name: 'Access-Control-Request-Origin', value: '*' } as any, {}];
    this.request.datas = [{} as any];
    // this.request.headers[0].append()





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





  sendReq() {
    if (this.request.method === 'GET') {

      const option = {
        headers: this.request.getHeaders(),
        params: this.request.getParams(),
        observe: 'response',
        reportProgress: this.request.reportProgress ? this.request.reportProgress : false,
        responseType: 'json',
      };

      this.req.get(this.request.url, option).subscribe(x => {
        console.log(x);
        this.response = x;
        const ele = document.getElementById('jsonResponse');
        ele.innerHTML = this.req.library.json.prettyPrint(this.response.body);
        const eleHeader = document.getElementById('jsonResponseHeader');
        eleHeader.innerHTML = this.req.library.json.prettyPrint(this.req.getHeadersInJson(this.response.headers));

      });
    }
  }
  ngOnInit() {
  }

}

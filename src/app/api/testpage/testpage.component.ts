import { Param } from './../interface/Param';
import { Component, OnInit } from '@angular/core';
import { Apirequest } from './../interface/Apirequest';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})
export class TestpageComponent implements OnInit {


  request: Apirequest = {} as Apirequest;


  constructor() {
    this.request.method = 'GET';
    this.request.params = [new Param()];
    this.request.headers = [new Headers()];
    this.request.datas = [{} as any];
    // this.request.headers[0].append()



  }

  addParam(index) {
    if (index === this.request.params.length - 1) {
      this.request.params.push(new Param());
    }
  }
  addHeader(index) {
    if (index === this.request.headers.length - 1) {
      this.request.headers.push(new Headers());
    }
  }
  addData(index) {
    if (index === this.request.datas.length - 1) {
      this.request.datas.push({} as any);
    }
  }



  fillreq(req, e, i, key) {
    if (req === 'params') {
      this.request.params[i][key] = e.target.innerText;
    } else if (req === 'headers') {
      this.request.headers[i][key] = e.target.innerText;
    } else if (req === 'datas') {
      this.request.datas[i][key] = e.target.innerText;
    }
  }

  sendReq() {
    console.log(this.request);
  }
  ngOnInit() {
  }

}

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


  request: Apirequest = {} as Apirequest;
  response: any = {} as any;
  library: any = {} as any;

  // @ViewChild('jsonResponse', { static: false }) jsonResponse: ElementRef;
  constructor(private req: ApirequestService, private ele: ElementRef) {
    this.request.method = 'GET';
    this.request.params = [new Param()];
    this.request.headers = [new HttpHeaders()];
    this.request.datas = [{} as any];
    // this.request.headers[0].append()



    if (!this.library) {
      this.library = {};
    }

    this.library.json = {
      replacer: (match, pIndent, pKey, pVal, pEnd) => {
        const key = '<span class=json-key style="color: #444;">';
        const val = '<span class=json-value style="color:#2590CE;" >';
        const str = '<span class=json-string style="color:#888;">';
        let r = pIndent || '';
        if (pKey) {
          r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        }
        if (pVal) {
          r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
        }
        return r + (pEnd || '');
      },
      prettyPrint: (obj) => {
        const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        return JSON.stringify(obj, null, 3)
          .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
          .replace(/</g, '&lt;').replace(/>/g, '&gt;')
          .replace(jsonLine, this.library.json.replacer);
      }
    };



  }

  addParam(index) {
    if (index === this.request.params.length - 1) {
      this.request.params.push(new Param());
    }
  }
  addHeader(index) {
    if (index === this.request.headers.length - 1) {
      this.request.headers.push(new HttpHeaders());
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
    if (this.request.method === 'GET') {

      this.req.get(this.request.url, {
        headers: this.request.headers,
        params: this.request.params,
        observe: 'response'
      }).subscribe(x => {
        this.response = x;
        const ele = document.getElementById('jsonResponse');
        ele.innerHTML = this.library.json.prettyPrint(this.response.body);
        console.log(this.response.body);

      });
    }
  }
  ngOnInit() {
  }

}

import { Injectable } from '@angular/core';
import { ApirequestService } from 'src/app/api/apirequest.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutoTestGetService {

  httpOptions:any = {};
  ret:string[] = [];
  resp:any;
  testcase1s:string = "Test without headers";
  testcase2s:string = "Test with headers";

  constructor(private requestService:ApirequestService) { }

  async testGet(url:string,httpHeaders:HttpHeaders):Promise<string[]>{
    this.httpOptions.headers = httpHeaders;
    // Testing without headers
    console.log("Testing without headers.");
    return await this.requestService.get(url).toPromise().then(resp => {
      this.ret.push(`Testcase1:${this.testcase1s}:pass`);
      console.log("Passed");
    },resperr => {
      this.ret.push(`Testcase1:${this.testcase1s}:fail`);
      console.log("Failed.");
    }).then(resp => {
    console.log("Testing with headers.");
    return this.requestService.get(url,this.httpOptions).toPromise();
    }).then(resp => {
        this.ret.push(`Testcase2:${this.testcase2s}:pass`);
        console.log("Passed");
      },resperr => {
        this.ret.push(`Testcase2:${this.testcase2s}:fail`);
        console.log("Failed.");
    }).then(x=>{
      return this.ret;
    });

  }

  compl(){

  }

}

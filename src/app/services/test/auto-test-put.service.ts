import { ApirequestService } from 'src/app/api/apirequest.service';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoTestPutService {

  url:string;
  httpOptions:any = {};
  ret:string[] = [];
  testcaseDetails:string[] = ["no data given.","user data given."];
  data:any = {};
  allReqs:Observable<any>[] = [];
  testcaseResp:any[] = [{}];
  testcaseCount:number = 1;

  constructor(private apiRequest:ApirequestService) { }

  testPut(url:string,options:any,data?:any){
    this.testcaseCount = 1;
    this.ret = [];
    this.url = url;
    this.httpOptions = options;
    this.data = data;
    this.testcaseResp.push(data);
    this.allReqs = this.getAllReqs();
    forkJoin(this.allReqs).subscribe(
      resp=>{
      resp.forEach(x => {
        let i = this.testcaseCount - 1;
        if(this.checkValidity(x,this.testcaseResp[i]))
        this.ret.push(`Testcase ${this.testcaseCount} : pass for ${this.testcaseDetails[i]}`);
        else
        this.ret.push(`Testcase ${this.testcaseCount} : fail for ${this.testcaseDetails[i]}`);
        this.testcaseCount += 1;
      });
    },err=>{
        let i = this.testcaseCount - 1;
        this.ret.push(`Testcase ${this.testcaseCount} : server error.`);
        this.testcaseCount += 1;
    });
    return this.ret;
  }

  checkValidity(resp:any,exp:any):boolean{
    for(let key in exp)
    if(!(key in resp) || exp[key]!=resp[key])
    return false;
    return true;
  }

  getAllReqs():Observable<any>[]{
    return [this.apiRequest.put(this.url,{},this.httpOptions),
      this.apiRequest.put(this.url,this.data,this.httpOptions)];
  }
}

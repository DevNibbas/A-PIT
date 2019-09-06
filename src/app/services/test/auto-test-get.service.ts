import { ApiTestingContractService } from './../common/api-testing-contract.service';
import { Injectable } from '@angular/core';
import { ApirequestService } from 'src/app/api/apirequest.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutoTestGetService {

  httpOptions: any = {};
  ret: string[] = [];
  testcaseCount = 1;
  url:string;
  testcase1s = 'test without headers';
  testcase2s = 'test with headers';
  testcasesDetails:string[] = [this.testcase1s,this.testcase2s];
  allReqs:Observable<any>[];

  constructor(private requestService: ApirequestService,private contractClass:ApiTestingContractService) { }

  testGet(url: string, options: any):string[]{
    let passVals = [this.contractClass.HTTP_GET_SUCCESS_CODE];
    let failVals = [this.contractClass.HTTP_GET_NOT_FOUND_CODE,this.contractClass.HTTP_GET_BAD_REQUEST];
    this.testcaseCount = 1;
    this.ret = [];
    this.url = url;
    this.httpOptions = options;
    this.allReqs = this.getAllReqs();
    forkJoin(this.allReqs).subscribe(resp =>{
      resp.forEach(x =>{
        if(passVals.includes(x.status))
        this.ret.push(`Testcase ${this.testcaseCount}:pass:${this.testcasesDetails[this.testcaseCount-1]}:${x.status}`);
        else
        this.ret.push(`Testcase ${this.testcaseCount}:fail:${this.testcasesDetails[this.testcaseCount-1]}:${x.status}`);
        this.testcaseCount += 1;
      })
    },err=>{
        this.ret.push(`Testcase ${this.testcaseCount}:fail:server error:${err.status}`);
        this.testcaseCount += 1;
    });
    return this.ret;
  }

  getAllReqs():Observable<any>[]{
    let woOptions:any = {};
    for(let i in this.httpOptions){
      if(i!='headers')
      woOptions[i] = this.httpOptions[i];
    }
    let woHeader = this.requestService.get(this.url,woOptions);
    let wHeader = this.requestService.get(this.url,this.httpOptions);
    return [woHeader,wHeader];
  }

}

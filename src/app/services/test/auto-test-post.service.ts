import { ApiTestingContractService } from './../common/api-testing-contract.service';
import { StringGeneratorService } from './../common/string-generator.service';
import { ApirequestService } from 'src/app/api/apirequest.service';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoTestPostService {

  httpOptions:any = {};
  testcase_count:number = 0;
  url:string;
  ret:string[] = [];
  obs:Observable<any>[];
  trueVals:string[] = [];
  paramNames:string[] = [];
  paramRegex:string[] = [];
  testResultParamNames = ["No"];

  constructor(private requestService:ApirequestService,
    private stringGenService:StringGeneratorService,
    private apiContract:ApiTestingContractService) { }

  testPost(url:string,paramNames:string[],paramRegex:string[],options:any):string[]{
    this.ret = [];
    let passVals = [this.apiContract.HTTP_POST_SUCCESS_CODE,this.apiContract.HTTP_POST_CREATED_CODE];
    let failVals = [this.apiContract.HTTP_POST_NO_CONTENT_CODE,this.apiContract.HTTP_POST_NOT_FOUND_CODE,this.apiContract.HTTP_POST_BAD_REQUEST];
    this.testcase_count = 1;
    this.url = url;
    this.httpOptions = options;
    this.paramNames = paramNames;
    this.paramRegex = paramRegex;
    for(let index = 0; index<paramRegex.length;index++){
      this.trueVals.push(this.stringGenService.createString(paramRegex[index]));
      this.testResultParamNames.push(paramNames[index]);
    };
    this.obs = this.getAllReqsWH();
    forkJoin(this.obs).subscribe(resp =>{
      resp.forEach(x => {
        let i = this.testcase_count-1;
        if(passVals.includes(x.status))
        this.ret.push(`Testcase ${this.testcase_count}:pass:${this.testResultParamNames[i]} parameter missing:${x.status}`);
        else
        this.ret.push(`Testcase ${this.testcase_count}:fail:${this.testResultParamNames[i]} parameter missing:${x.status}`);
        this.testcase_count += 1;
      })
    },err => {
        let i = this.testcase_count - 1;
        this.ret.push(`Testcase ${this.testcase_count}:fail:server error:${err.status}`);
        this.testcase_count += 1;
    });
    return this.ret;
  }

  genData(i:number){
    let ret = {};
    for (let index = 0; index < this.paramNames.length; index++)
      if(index!=i)
        ret[this.paramNames[index]] = this.trueVals[index];
    return ret;
  }

  getAllReqsWH():Observable<any>[]{
    let defReqWHeader = this.requestService.post(this.url,this.genData(-1),this.httpOptions);
    let ret = [defReqWHeader];
    for(let i=0;i<this.paramNames.length;i++)
      ret.push(this.requestService.post(this.url,this.genData(i),this.httpOptions));
    return ret;
  }

}
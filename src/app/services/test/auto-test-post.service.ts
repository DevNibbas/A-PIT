import { StringGeneratorService } from './../common/string-generator.service';
import { HttpHeaders } from '@angular/common/http';
import { ApirequestService } from 'src/app/api/apirequest.service';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoTestPostService {

  httpOptions:any = {};
  testcase_count:number = 1;
  url:string;
  resp:any;
  ret:string[] = [];
  params:any;
  len:number;
  obs:Observable<any>[];
  trueVals:string[] = [];
  resultVals:string[] = ["pass"];
  paramNames:string[] = [];
  paramRegex:string[] = [];
  paramOptional:string[] = [];

  constructor(private requestService:ApirequestService,
    private stringGenService:StringGeneratorService) { }

  testPost(url:string,paramNames:string[],paramRegex:string[],httpHeaders:HttpHeaders
    ,paramOptional:string[],resultName:string,resultVal:string){
    this.url = url;
    this.httpOptions.headers = httpHeaders;
    this.paramNames = paramNames;
    this.paramRegex = paramRegex;
    this.paramOptional = paramOptional;
    for(let index = 0; index<paramRegex.length;index++){
      if(paramOptional.includes(paramNames[index]))
        this.resultVals[index+1] = "pass";
      else
        this.resultVals[index+1] = "fail";
      this.trueVals.push(this.stringGenService.createString(paramRegex[index]));
    };
    this.obs = this.getAllReqsWH();
    forkJoin(this.obs).subscribe(resp =>{
      resp.forEach(x => {
        let i = resp.indexOf(x);
        if(x[resultName]==resultVal)
        if(this.resultVals[i]=='pass')
        this.ret.push(`Testcase${i}:pass`);
        else
        this.ret.push(`Testcase${i}:fail`);
        else
        this.ret.push(`Testcase${i}:fail`);
        i += 1;
      })
    },err => {
      err.forEach(x => {
        let i = err.indexOf(x);
        this.ret.push(`Testcase${i}:fail`);
        i += 1;
      });
    });
    console.log(this.ret);
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
      ret.push(this.requestService.post(this.url,this.genData(i)));
    return ret;
  }

}
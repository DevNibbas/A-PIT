import { Injectable } from '@angular/core';
import { ApirequestService } from 'src/app/api/apirequest.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutoTestGetService {

  httpOptions: any = {};
  ret: string[] = [];
  resp: any;
  testcaseCount = 1;
  url:string;
  testcase1s = 'test without headers';
  testcase2s = 'test with headers';
  testcasesDetails:string[] = [this.testcase1s,this.testcase2s];
  allReqs:Observable<any>[];

  constructor(private requestService: ApirequestService) { }

  testGet(url: string, httpHeaders: HttpHeaders):string[]{
    this.testcaseCount = 1;
    this.ret = [];
    this.url = url;
    this.httpOptions.headers = httpHeaders;
    this.allReqs = this.getAllReqs();
    forkJoin(this.allReqs).subscribe(resp =>{
      resp.forEach(x =>{
        let i = resp.indexOf(x);
        this.ret.push(`Testcase ${this.testcaseCount} : pass for ${this.testcasesDetails[i]}`);
        this.testcaseCount += 1;
      })
    },err=>{
      err.forEach(x => {
        let i = err.indexOf(x);
        this.ret.push(`Testcase ${this.testcaseCount} : fail for ${this.testcasesDetails[i]}`);
        this.testcaseCount += 1;
      });
    });
    return this.ret;
  }

  getAllReqs():Observable<any>[]{
    let woHeader = this.requestService.get(this.url);
    let wHeader = this.requestService.get(this.url,this.httpOptions);
    return [woHeader,wHeader];
  }

}

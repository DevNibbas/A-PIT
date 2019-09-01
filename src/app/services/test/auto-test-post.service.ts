import { HttpHeaders } from '@angular/common/http';
import { ApirequestService } from 'src/app/api/apirequest.service';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoTestPostService {

  httpOptions:any = {};
  resp:any;
  ret:string[] = [];
  params:any;
  len:number;
  obs:Observable<any>[];
  trueVals:string[] = [];
  falseVals:string[] = [];
  paramNames:string[] = [];
  temp:string[] = [];

  constructor(private requestService:ApirequestService) { }

  testPost(url:String,paramNames:string[],httpHeaders:HttpHeaders){
    this.httpOptions.headers = httpHeaders;
    this.params.forEach(element => {
      this.temp = element.split(':');
    });

  }
}

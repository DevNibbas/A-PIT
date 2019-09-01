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
  obs:Observable<any>[];

  constructor(private requestService:ApirequestService) { }

  testPost(url:String,params:string[],httpHeaders:HttpHeaders){
    this.httpOptions.headers = httpHeaders;
    
    

  }
}

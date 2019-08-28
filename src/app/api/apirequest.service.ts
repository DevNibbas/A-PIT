import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirequestService {

  constructor(private http: HttpClient) { }

  get(url: string, options?: any): Observable<any> {
    return this.http.get<any>(url, options);
  }

  /*postReq(url:string,data?:any,options?:any){

  }

  putReq(url:string,data?:any,options?:any){

  }

  deleteReq(url:string,data?:any,options?:any){
  }*/

}

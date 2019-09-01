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

  post(url:string,data:any,options?:any){
    return this.http.post<any>(url,data,options);
  }

  put(url:string,data?:any,options?:any){
    return this.http.put<any>(url,data,options);
  }

  delete(url:string,options?:any){
    return this.http.delete<any>(url,options);
  }

  patch(url:string,data:any,options?:any){
    return this.http.patch(url,data,options);
  }

  uniReq(method:string,obj:any){
    switch (method) {
      case "GET":
        this.get(obj.url,obj.options);
        break;
      case "POST":
        this.post(obj.url,obj.data,obj.options);
        break;
      case "PUT":
        this.put(obj.url,obj.data,obj.options);
        break;
      case "DELETE":
        this.put(obj.url,obj.options);
        break;
      case "PATCH":
        this.patch(obj.url,obj.data,obj.options);
      default:
        break;
    }
  }
}

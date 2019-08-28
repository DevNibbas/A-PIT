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

  putReq(url:string,data?:any,options?:any){

  }

  deleteReq(url:string,data?:any,options?:any){
<<<<<<< HEAD
    
  }
=======
  }*/
>>>>>>> 93eb64a1546907f7950fa2353d6938ea79048ff1

}

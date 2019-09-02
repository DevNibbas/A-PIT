import { Apirequest } from './interface/Apirequest';
import { Param } from './interface/Param';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirequestService {

  library;
  constructor(private http: HttpClient) {
    if (!this.library) {
      this.library = {};
    }

    this.library.json = {
      replacer: (match, pIndent, pKey, pVal, pEnd) => {
        const key = '<span class=json-key style="color: #444;">';
        const val = '<span class=json-value style="color:#2590CE;" >';
        const str = '<span class=json-string style="color:#888;">';
        let r = pIndent || '';
        if (pKey) {
          r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        }
        if (pVal) {
          r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
        }
        return r + (pEnd || '');
      },
      prettyPrint: (obj) => {
        const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        return JSON.stringify(obj, null, 3)
          .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
          .replace(/</g, '&lt;').replace(/>/g, '&gt;')
          .replace(jsonLine, this.library.json.replacer);
      }
    };
  }





  get(url: string, options?: any): Observable<any> {

    return this.http.get(url, {
      headers: options.getHeaders(),
      params: options.getParams(),
      observe: 'response',
      reportProgress: options.reportProgress ? options.reportProgress : false,
      responseType: 'json',

    });
  }



  post(url: string, data: any, options?: any) {
    return this.http.post<any>(url, data, options);
  }

  put(url: string, data?: any, options?: any) {
    return this.http.put<any>(url, data, options);
  }

  delete(url: string, options?: any) {
    return this.http.delete<any>(url, options);
  }

  patch(url: string, data: any, options?: any) {
    return this.http.patch(url, data, options);
  }


  getHeadersInJson(headers: HttpHeaders) {
    const jsonHeader = JSON;
    headers.keys().forEach(k => {
      jsonHeader[k] = headers.get(k);
    });
    return jsonHeader;
  }

}

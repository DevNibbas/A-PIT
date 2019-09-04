import { AutoTestDeleteService } from './auto-test-delete.service';
import { AutoTestPatchService } from './auto-test-patch.service';
import { AutoTestPutService } from './auto-test-put.service';
import { AutoTestPostService } from './auto-test-post.service';
import { AutoTestGetService } from 'src/app/services/test/auto-test-get.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutomatedTestService {

  constructor(private autoGet:AutoTestGetService,
    private autoPost:AutoTestPostService,
    private autoPut:AutoTestPutService,
    private autoPatch:AutoTestPatchService,
    private autoDelete:AutoTestDeleteService) { }
  
  test(method:string,object:any):string[]{
    let url = object.url;
    let httpHeaders = object.httpHeaders;
    if(method=='GET')
    return this.autoGet.testGet(url,httpHeaders);
    if(method=='POST')
    return this.autoPost.testPost(url,object.paramNames,object.paramRegex,httpHeaders);
    if(method=='PUT')
    return this.autoPut.testPut(url,httpHeaders,object.data);
    return [];
  }

}
import { Apirequest } from './../../api/interface/Apirequest';
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
  
  test(req:Apirequest,options:any):string[]{
    let method = req.method;
    let url = req.url;
    let httpOptions = options;
    let dataNames = [];
    let dataRegex = [];
    req.datas.forEach(d => {
      if(d.key){
        dataNames.push(d.key);
        dataRegex.push(d.value);
      }
    });
    console.log(req);
    if(method=='GET')
    return this.autoGet.testGet(url,httpOptions);
    if(method=='POST')
    return this.autoPost.testPost(url,dataNames,dataRegex,httpOptions);
    if(method=='PUT')
    return this.autoPut.testPut(url,httpOptions,req.getDatas());
    return [];
  }

}
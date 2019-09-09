import { HistIDBContract } from './api/interface/HistIDBContract';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _dbHistoryReq:IDBOpenDBRequest;
  private _dbHistoryDB:IDBDatabase;

  constructor() { 
    this._dbHistoryReq = window.indexedDB.open(HistIDBContract._dbNameHistory,
      HistIDBContract._dbVersionHistory);
    this._dbHistoryReq.onupgradeneeded = ()=>{
      this._dbHistoryDB = this._dbHistoryReq.result;
      let reqHist = this._dbHistoryDB.createObjectStore(
        HistIDBContract._tReqHistoryName,{keyPath:HistIDBContract._tReqUniqueId,autoIncrement:true});
      this.addIndexesWithOutOptions(reqHist,[HistIDBContract._tReqHistoryUserId,
        HistIDBContract._tReqHistoryMethod,HistIDBContract._tReqHistoryURL,
        HistIDBContract._tReqHistoryParams,HistIDBContract._tReqHistoryHeaders,
        HistIDBContract._tReqHistoryData,HistIDBContract._tReqHistoryAuth,HistIDBContract._tReqHistoryAuthType,
        HistIDBContract._tReqHistoryAuthUname,HistIDBContract._tReqHistoryAuthPwd,HistIDBContract._tReqHistoryBearerToken]);
    };
    this._dbHistoryReq.onsuccess = ()=>{
      this._dbHistoryDB = this._dbHistoryReq.result;
    };
  }

  private addIndexesWithOutOptions(db:IDBObjectStore,indexNames:string[]):void{
    indexNames.forEach(x => {
      db.createIndex(x,x);
    });
  }

  addRequestHistory(object:any){
    let reqHistTransaction = this._dbHistoryDB.transaction(HistIDBContract._tReqHistoryName,
        HistIDBContract._transactionRW);
    reqHistTransaction.objectStore(HistIDBContract._tReqHistoryName).put(object);
    reqHistTransaction.oncomplete = ()=>{
      console.log('Success');
    }
    reqHistTransaction.onerror = (err)=>{
      console.log(err);
    }
  }

  getRequestHistory(uid:any):IDBRequest<any>{
    let reqHistTransaction = this._dbHistoryDB.transaction(HistIDBContract._tReqHistoryName,
        HistIDBContract._transactionRO);
    let reqHistStore = reqHistTransaction.objectStore(HistIDBContract._tReqHistoryName);
    let uidIndex = reqHistStore.index(HistIDBContract._tReqHistoryUserId);
    return uidIndex.getAll(uid);
  }

}

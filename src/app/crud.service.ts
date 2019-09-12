import { IDBContract } from './api/interface/IDBContract';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _dbAPITReq: IDBOpenDBRequest;
  // tslint:disable-next-line:variable-name
  private _dbAPIT: IDBDatabase;
  private _dbOpen: boolean = false;

  constructor() {
    this._dbOpen = false;
    this.openAPITDB();
  }

  private addIndexesWithOutOptions(db: IDBObjectStore, indexNames: string[]): void {
    indexNames.forEach(x => {
      db.createIndex(x, x);
    });
  }

  addRequestHistory(object: any) {
    const reqHistTransaction = this._dbAPIT.transaction(IDBContract._tReqHistoryStoreName,
      IDBContract._transactionRW);
    reqHistTransaction.objectStore(IDBContract._tReqHistoryStoreName).put(object);
    reqHistTransaction.oncomplete = () => {
      console.log('Success');
    };
    reqHistTransaction.onerror = (err) => {
      console.log(err);
    };
  }

  getModelNames(uid: any): IDBRequest<any> {
    const modelNameTransaction = this._dbAPIT.transaction(IDBContract._tModelStoreName,
      IDBContract._transactionRO);
    const modelNameStore = modelNameTransaction.objectStore(IDBContract._tModelStoreName);
    const uidIndex = modelNameStore.index(IDBContract._tModelIndexUid);
    return uidIndex.getAll(uid);
  }

  getRequestHistory(uid: any): IDBRequest<any> {
    const reqHistTransaction = this._dbAPIT.transaction(IDBContract._tReqHistoryStoreName, IDBContract._transactionRO);
    const reqHistStore = reqHistTransaction.objectStore(IDBContract._tReqHistoryStoreName);
    const uidIndex = reqHistStore.index(IDBContract._tReqHistoryIndexUserId);
    return uidIndex.getAll(uid);
  }

  isDBOpened(): boolean{
    return this._dbOpen;
  }

  openAPITDB() {
    this._dbAPITReq = window.indexedDB.open(IDBContract._databaseName,
      IDBContract._dbVersionHistory);
    this._dbAPITReq.onupgradeneeded = () => {
      this._dbAPIT = this._dbAPITReq.result;
      const reqHistStore = this._dbAPIT.createObjectStore(
        IDBContract._tReqHistoryStoreName, { keyPath: IDBContract._tReqHistoryIndexUniqueId, autoIncrement: true });
      this.addIndexesWithOutOptions(reqHistStore, [IDBContract._tReqHistoryIndexUserId,
      IDBContract._tReqHistoryIndexMethod, IDBContract._tReqHistoryIndexURL,
      IDBContract._tReqHistoryIndexParams, IDBContract._tReqHistoryIndexHeaders,
      IDBContract._tReqHistoryIndexData, IDBContract._tReqHistoryIndexAuth, 
      IDBContract._tReqHistoryIndexAuthType,IDBContract._tReqHistoryIndexAuthUname, 
      IDBContract._tReqHistoryIndexAuthPwd, IDBContract._tReqHistoryIndexBearerToken]);
      const modelsStore = this._dbAPIT.createObjectStore(
        IDBContract._tModelStoreName, { keyPath: IDBContract._tModelIndexId, autoIncrement: true });
      this.addIndexesWithOutOptions(modelsStore, [IDBContract._tModelIndexName, 
        IDBContract._tModelIndexUid,IDBContract._tModelIndexType,IDBContract._tModelIndexData]);
    };
    this._dbAPITReq.onsuccess = () => {
      this._dbOpen = true;
      this._dbAPIT = this._dbAPITReq.result;
    };
  }

}

import { HistIDBContract } from './api/interface/HistIDBContract';
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
    const reqHistTransaction = this._dbAPIT.transaction(HistIDBContract._tReqHistoryStoreName,
      HistIDBContract._transactionRW);
    reqHistTransaction.objectStore(HistIDBContract._tReqHistoryStoreName).put(object);
    reqHistTransaction.oncomplete = () => {
      console.log('Success');
    };
    reqHistTransaction.onerror = (err) => {
      console.log(err);
    };
  }

  getModelNames(uid: any): IDBRequest<any> {
    const modelNameTransaction = this._dbAPIT.transaction(HistIDBContract._tModelStoreName,
      HistIDBContract._transactionRO);
    const modelNameStore = modelNameTransaction.objectStore(HistIDBContract._tModelStoreName);
    const uidIndex = modelNameStore.index(HistIDBContract._tModelIndexUid);
    return uidIndex.getAll(uid);
  }

  getRequestHistory(uid: any): IDBRequest<any> {
    const reqHistTransaction = this._dbAPIT.transaction(HistIDBContract._tReqHistoryStoreName, HistIDBContract._transactionRO);
    const reqHistStore = reqHistTransaction.objectStore(HistIDBContract._tReqHistoryStoreName);
    const uidIndex = reqHistStore.index(HistIDBContract._tReqHistoryIndexUserId);
    return uidIndex.getAll(uid);
  }

  isDBOpened(): boolean{
    return this._dbOpen;
  }

  openAPITDB() {
    this._dbAPITReq = window.indexedDB.open(HistIDBContract._databaseName,
      HistIDBContract._dbVersionHistory);
    this._dbAPITReq.onupgradeneeded = () => {
      this._dbAPIT = this._dbAPITReq.result;
      const reqHistStore = this._dbAPIT.createObjectStore(
        HistIDBContract._tReqHistoryStoreName, { keyPath: HistIDBContract._tReqHistoryIndexUniqueId, autoIncrement: true });
      this.addIndexesWithOutOptions(reqHistStore, [HistIDBContract._tReqHistoryIndexUserId,
      HistIDBContract._tReqHistoryIndexMethod, HistIDBContract._tReqHistoryIndexURL,
      HistIDBContract._tReqHistoryIndexParams, HistIDBContract._tReqHistoryIndexHeaders,
      HistIDBContract._tReqHistoryIndexData, HistIDBContract._tReqHistoryIndexAuth, 
      HistIDBContract._tReqHistoryIndexAuthType,HistIDBContract._tReqHistoryIndexAuthUname, 
      HistIDBContract._tReqHistoryIndexAuthPwd, HistIDBContract._tReqHistoryIndexBearerToken]);
      const modelsStore = this._dbAPIT.createObjectStore(
        HistIDBContract._tModelStoreName, { keyPath: HistIDBContract._tModelIndexId, autoIncrement: true });
      this.addIndexesWithOutOptions(modelsStore, [HistIDBContract._tModelIndexName, 
        HistIDBContract._tModelIndexUid,HistIDBContract._tModelIndexType,HistIDBContract._tModelIndexData]);
    };
    this._dbAPITReq.onsuccess = () => {
      this._dbOpen = true;
      this._dbAPIT = this._dbAPITReq.result;
    };
  }

}

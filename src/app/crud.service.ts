import { HistIDBContract } from './api/interface/HistIDBContract';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // tslint:disable-next-line:variable-name
  private _dbHistoryReq: IDBOpenDBRequest;
  private _dbModelNameReq: IDBOpenDBRequest;
  // tslint:disable-next-line:variable-name
  private _dbHistoryDB: IDBDatabase;
  private _dbModelDB: IDBDatabase;
  private _dbHistoryOpen: boolean = false;
  private _dbModelOpen: boolean = false;

  constructor() {
    this._dbHistoryOpen = false;
    this._dbModelOpen = false;
    this.openHistoryDB();
    this.openModelDB();
  }

  private addIndexesWithOutOptions(db: IDBObjectStore, indexNames: string[]): void {
    indexNames.forEach(x => {
      db.createIndex(x, x);
    });
  }

  addRequestHistory(object: any) {
    const reqHistTransaction = this._dbHistoryDB.transaction(HistIDBContract._tReqHistoryName,
      HistIDBContract._transactionRW);
    reqHistTransaction.objectStore(HistIDBContract._tReqHistoryName).put(object);
    reqHistTransaction.oncomplete = () => {
      console.log('Success');
    };
    reqHistTransaction.onerror = (err) => {
      console.log(err);
    };
  }

  getModelNames(uid: any): IDBRequest<any>{
    const modelNameTransaction = this._dbModelDB.transaction(HistIDBContract._tModelName,
      HistIDBContract._transactionRO);
    const modelNameStore = modelNameTransaction.objectStore(HistIDBContract._tModelName);
    const uidIndex = modelNameStore.index(HistIDBContract._tModelNameUid);
    return uidIndex.getAll(uid);
  }

  getRequestHistory(uid: any): IDBRequest<any> {
    const reqHistTransaction = this._dbHistoryDB.transaction(HistIDBContract._tReqHistoryName,
      HistIDBContract._transactionRO);
    const reqHistStore = reqHistTransaction.objectStore(HistIDBContract._tReqHistoryName);
    const uidIndex = reqHistStore.index(HistIDBContract._tReqHistoryUserId);
    return uidIndex.getAll(uid);
  }

  isHistoryDBOpened(){
    return this._dbHistoryOpen;
  }

  isModelDBOpened(){
    return this._dbModelOpen;
  }

  openHistoryDB(){
    this._dbHistoryReq = window.indexedDB.open(HistIDBContract._dbNameHistory,
      HistIDBContract._dbVersionHistory);
    this._dbHistoryReq.onupgradeneeded = () => {
      this._dbHistoryDB = this._dbHistoryReq.result;
      const reqHist = this._dbHistoryDB.createObjectStore(
        HistIDBContract._tReqHistoryName, { keyPath: HistIDBContract._tReqUniqueId, autoIncrement: true });
      this.addIndexesWithOutOptions(reqHist, [HistIDBContract._tReqHistoryUserId,
      HistIDBContract._tReqHistoryMethod, HistIDBContract._tReqHistoryURL,
      HistIDBContract._tReqHistoryParams, HistIDBContract._tReqHistoryHeaders,
      HistIDBContract._tReqHistoryData, HistIDBContract._tReqHistoryAuth, HistIDBContract._tReqHistoryAuthType,
      HistIDBContract._tReqHistoryAuthUname, HistIDBContract._tReqHistoryAuthPwd, HistIDBContract._tReqHistoryBearerToken]);
    };
    this._dbHistoryReq.onsuccess = () => {
      this._dbHistoryOpen = true;
      this._dbHistoryDB = this._dbHistoryReq.result;
    };
  }

  openModelDB(){
    this._dbModelNameReq = window.indexedDB.open(HistIDBContract._dbNameModels,
      HistIDBContract._dbVersionModelName);
    this._dbModelNameReq.onupgradeneeded = () => {
      this._dbModelDB = this._dbModelNameReq.result;
      const modelName = this._dbModelDB.createObjectStore(
        HistIDBContract._tModelName, {keyPath: HistIDBContract._tModelNameId, autoIncrement:true});
      this.addIndexesWithOutOptions(modelName,[HistIDBContract._tModelNameName,HistIDBContract._tModelNameUid]);
    };
    this._dbModelNameReq.onsuccess = () => {
      this._dbModelOpen = false;
      this._dbModelDB = this._dbModelNameReq.result;
    };
  }

}

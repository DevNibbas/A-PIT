import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _dbPromise;
  private dbName:string;
  private version:number;

  constructor(dbName:string,version:number) { 
    this.dbName = dbName;
    this.version = version;
  }

  connectIDB(){
    this._dbPromise = window.indexedDB.open(this.dbName,this.version);
  }
}

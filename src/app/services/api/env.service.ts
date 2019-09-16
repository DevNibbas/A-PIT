import { state } from '@angular/animations';
import { CrudService } from './../../crud.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  store: any[] = [];
  private _allEnvs = new BehaviorSubject<any[]>([]);
  user;
  readonly ROallEnvs = this._allEnvs.asObservable();
  constructor(private db: CrudService) {
    this.user = JSON.parse(localStorage.getItem('userid'))[0];
    this.db.getAllEnv(this.user).then(res => this.store = res).then(r => {
      this._allEnvs.next(this.store);
    });
  }

  addEnv(obj) {
    obj.uid = this.user;
    return this.db.addEnv(obj).then(id => {
      obj.id = id;
      this.store.push(obj);
      this._allEnvs.next(this.store);

      return id;
    });
  }

  updateEnv(index, obj) {
    obj.uid = this.user;
    return this.db.addEnv(obj).then(id => {
      obj.id = id;
      this.store[index].name = obj.name;
      this.store[index].value = obj.value;


      this._allEnvs.next(this.store);

      return id;
    });
  }

  deleteEnv(index, id) {
    this.db.deleteEnvEntry(id).then(res => {
      this.store.splice(index, 1);
      this._allEnvs.next(this.store);
    });
  }



  get Envs() {
    return this._allEnvs.asObservable();

  }
  delEnv(id) {

  }
}

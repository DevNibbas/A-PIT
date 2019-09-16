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

  updateEnv(obj) {
    obj.uid = this.user;
    return this.db.addEnv(obj).then(id => {
      obj.id = id;
      this.store.forEach(s => {
        if (s.id === id) {
          s.name = obj.name;
          s.value = obj.value;
        }
      });
      this._allEnvs.next(this.store);

      return id;
    });
  }



  get Envs() {
    return this._allEnvs.asObservable();

  }
  delEnv(id) {

  }
}

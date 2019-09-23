import { CrudService } from './../../crud.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { EnvService } from 'src/app/services/api/env.service';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent implements OnInit, OnDestroy {

  json = JSON;

  envs: any = {};
  error;
  env: any = { key: '', value: '' };
  object = Object;
  doc = document;
  envobjects;
  editEnv;
  subs;

  constructor(public envservice: EnvService) {
    this.subs = this.envservice.Envs.subscribe(envs => {

      envs.forEach(env => {
        this.envs[env.name] = { id: env.id, value: env.value };
      });
      this.envobjects = this.object.keys(this.envs);
    });
    this.envservice.parseEnv('sam').then(res => console.log(res));


  }

  addEnv() {
    if (this.env.key && !this.envs.hasOwnProperty(this.env.key)) {
      this.envservice.addEnv({ name: this.env.key, value: this.env.value });
      this.env = {};
    } else if (this.env.key) {
      this.error = 'Key already exist';
    } else {
      this.error = 'please enter a key';
    }

    document.getElementById('inputkey').focus();
  }

  enableEdit(i) {
    this.editEnv = {};
    this.editEnv.key = i;
    this.editEnv.value = this.envs[i].value;
    setTimeout(e => {
      document.getElementById('edit-env-' + i).focus();

    }, 500);

  }
  editEnvVar(index, i) {
    this.envservice.updateEnv(index, { id: this.envs[i].id, name: i, value: this.editEnv.value });
    this.editEnv = undefined;
  }
  deleteEnv(index, id) {
    this.envservice.deleteEnv(index, this.envs[id].id);

  }


  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}

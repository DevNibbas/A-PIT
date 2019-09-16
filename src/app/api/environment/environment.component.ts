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
  envobjects;
  editEnv;
  subs;
  @ViewChild('#edit-env', { static: false }) inpkey;

  constructor(public envservice: EnvService) {
    this.subs = this.envservice.Envs.subscribe(envs => {

      envs.forEach(env => {
        this.envs[env.name] = { id: env.id, value: env.value };
        console.log(env);
      });
      this.envobjects = this.object.keys(this.envs);
      console.log(this.envobjects);
    });
  }

  addEnv() {
    if (this.env.key && !this.envs.hasOwnProperty(this.env.key)) {
      this.envservice.addEnv({ name: this.env.key, value: this.env.value }).then(iid => {
        // this.envs[this.env.key] = {
        //   id: iid, value: this.env.value
        // };

      });
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
  editEnvVar(i) {
    // this.envs[this.editEnv.key] = this.editEnv.value;
    this.envservice.updateEnv({ id: this.envs[i].id, name: i, value: this.editEnv.value });
    this.editEnv = undefined;
  }
  deleteEnv(i) {
    delete this.envs[i];

  }


  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}

import { CrudService } from './../../crud.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent implements OnInit {

  json = JSON;

  envs: any = { sample: 'this is a sample env declaration', sample2: 'this is a sample env declaration' } as any;
  error;
  env: any = { key: '', value: '' };
  object = Object;
  envobjects;
  editEnv;
  @ViewChild('#edit-env', { static: false }) inpkey;

  constructor(private db: CrudService) {
    this.envobjects = this.object.keys(this.envs);
    console.log(this.object.keys(this.envs));
  }

  addEnv() {
    if (this.env.key && !this.envs.hasOwnProperty(this.env.key)) {
      this.envs[this.env.key] = this.env.value;
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
    this.editEnv.value = this.envs[i];
    setTimeout(e => {
      document.getElementById('edit-env-' + i).focus();

    }, 500);

  }
  editEnvVar(i) {
    this.envs[this.editEnv.key] = this.editEnv.value;
    this.editEnv = undefined;
  }
  deleteEnv(i) {
    delete this.envs[i];
  }


  ngOnInit() {
  }

}

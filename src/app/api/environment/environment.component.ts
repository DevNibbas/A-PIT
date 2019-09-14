import { element } from 'protractor';
import { CrudService } from './../../crud.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent implements OnInit {

  json = JSON;

  envs: any[] = [{ key: 'sample', value: 'this is a sample env declaration' } as any];

  env: any = { key: '', value: '' };
  editEnv;
  @ViewChild('inputkey', { static: false }) inpkey;

  constructor(private db: CrudService) { }

  addEnv() {
    this.envs.push({ key: this.env.key, value: this.env.value });
    this.env = {};
    document.getElementById('inputkey').focus();
  }

  enableEdit(i) {
    this.editEnv = this.envs[i];
  }
  editEnvVar(i) {
    this.envs[i] = this.editEnv;
    this.editEnv = undefined;
  }
  deleteEnv(i) {
    delete this.envs[i];
  }


  ngOnInit() {
  }

}

import { CrudService } from './../../crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent implements OnInit {

  json = JSON;

  envs: any[] = [{ key: 'sample', value: 'this is a sample env declaration' } as any];

  constructor(private db: CrudService) { }


  ngOnInit() {
  }

}

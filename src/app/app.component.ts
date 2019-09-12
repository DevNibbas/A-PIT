import { CrudService } from './crud.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'APIT';
  constructor(private db: CrudService) {

  }
}

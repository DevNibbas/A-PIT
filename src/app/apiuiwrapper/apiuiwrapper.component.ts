import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apiuiwrapper',
  templateUrl: './apiuiwrapper.component.html',
  styleUrls: ['./apiuiwrapper.component.scss']
})
export class ApiuiwrapperComponent implements OnInit {

  sidenavstat;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

}

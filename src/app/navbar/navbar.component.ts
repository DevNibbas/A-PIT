import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user;
  constructor(private auth: AuthService) {
    this.auth.getuser().subscribe(u => this.user = u);
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }
}

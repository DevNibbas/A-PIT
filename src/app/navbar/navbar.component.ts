import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user;


  @Input() activesidenavbutton = true;
  @Output() clicksidenav = new EventEmitter();

  constructor(private auth: AuthService) {
    this.auth.getuser().subscribe(u => this.user = u);
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }


  onClickSideNavButton() {
    this.activesidenavbutton = !this.activesidenavbutton;
    this.clicksidenav.emit();
  }
}

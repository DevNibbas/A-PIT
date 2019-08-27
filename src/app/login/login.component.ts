import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = { id: '', password: '' };
  errormsg;
  constructor(private auth: AuthService, private route: Router) {
    this.auth.isLoggedIn().subscribe(res => {
      if (res) {
        this.route.navigateByUrl('/api');
      }
    });

  }

  closeerror() {
    this.errormsg = null;
  }


  login() {
    console.log(this.user);
    this.auth.login(this.user.id, this.user.password).subscribe(res => {
      if (res) {
        this.route.navigateByUrl('/api');
      }
      else {
        this.errormsg = "User or password is incorrect ";
      }
    })
  }

  ngOnInit() {
  }

}

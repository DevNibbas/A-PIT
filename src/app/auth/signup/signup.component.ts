import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: any = { name: '', id: '', password: '' };
  errormsg;
  constructor(private auth: AuthService, private route: Router) {

    this.auth.isLoggedIn().subscribe(res => {
      if (res) {
        this.route.navigateByUrl('/api');

      }
    });


  }

  ngOnInit() {
  }
  closeerror() {
    this.errormsg = null;
  }

  signup() {
    this.auth.Signup(this.user).subscribe(res => {
      if (res) {
        console.log(res);
        console.log('signed up', this.user);
        this.route.navigateByUrl('/auth/login');
      } else {
        this.user = {};
        this.errormsg = 'Username already exist';
      }

    });

  }
}

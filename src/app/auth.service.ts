import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, of, Observable, BehaviorSubject } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new BehaviorSubject<any>(null);

  constructor(private route: Router) {
    if (localStorage.getItem('userid')) {

      const user = JSON.parse(localStorage.getItem('userid'));
      this.emit(user);
    }

  }


  getuser() {
    return this.user$.asObservable();
  }


  isLoggedIn() {
    return this.getuser();
  }

  emit(user) {
    this.user$.next(user);
  }




  login(username, password) {
    const users: any = JSON.parse(localStorage.getItem('users'));
    if (users && users[username] && users[username][1] === Md5.hashStr(password)) {
      localStorage.setItem('userid', JSON.stringify([users[username][0], username]));
      this.emit(users[username]);
      return this.getuser();

    }
    return of(null);
  }





  Signup(reguser) {
    reguser.password = Md5.hashStr(reguser.password);
    let users = JSON.parse(localStorage.getItem('users'));
    if (users && users[reguser.id]) {
      return of(null);
    } else if (users) {
      users[reguser.id] = [reguser.name, reguser.password];
      localStorage.setItem('users', JSON.stringify(users));
    } else {


      users = {};

      users[reguser.id] = [reguser.name, reguser.password];
      localStorage.setItem('users', JSON.stringify(users));

    }
    return of(users[reguser.id]);
  }



  logout() {
    localStorage.removeItem('userid');
    this.emit(null);
    this.route.navigateByUrl('/auth/login');
  }
}

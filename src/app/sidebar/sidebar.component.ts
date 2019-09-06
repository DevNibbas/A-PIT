import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(-100%)'

      })),
      transition('void=>*', [animate('150ms ease-out', style({
        opacity: 1,
        transform: 'translateX(0%)'


      }))]),
      transition('*=>void', [animate('150ms ease-out', style({
        opacity: 0,
        transform: 'translateX(-100%)'


      }))])
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Input() showsidenav = false;
  @Output() clicksidenavbg = new EventEmitter();
  @Output() triggerchat = new EventEmitter();


  user;
  subscription1: Subscription;
  constructor(private auth: AuthService) {
    this.auth.getuser().subscribe(u => this.user = u);
  }

  ngOnInit() {
  }
  signout() {
    this.auth.logout();
  }
  clicksdnav() {
    this.showsidenav = !this.showsidenav;
    this.clicksidenavbg.emit();
  }

  togglechat() {
    this.triggerchat.emit();
  }
  ngOnDestroy() {
  }
}

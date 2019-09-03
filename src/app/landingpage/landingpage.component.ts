import { PwaService } from './../pwa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  constructor(public Pwa: PwaService) { }

  promptEvent;
  ngOnInit() {
  }
  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }
}

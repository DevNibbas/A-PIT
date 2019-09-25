import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabcontrolledhome',
  templateUrl: './tabcontrolledhome.component.html',
  styleUrls: ['./tabcontrolledhome.component.scss']
})
export class TabcontrolledhomeComponent implements OnInit {

  tabs: any[] = ['Default'];
  selected = 0;

  constructor() { }

  addTabs() {
    this.tabs.push('New Tab');
    this.selected = 1;
  }
  ngOnInit() {
  }

}

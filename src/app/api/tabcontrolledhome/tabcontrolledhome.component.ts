import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabcontrolledhome',
  templateUrl: './tabcontrolledhome.component.html',
  styleUrls: ['./tabcontrolledhome.component.scss']
})
export class TabcontrolledhomeComponent implements OnInit {

  tabs: any[] = ['Default'];
  selected = 0;
  tabcontent: any[] = [{} as any];

  constructor() { }

  addTabs() {
    this.tabs.push('New Tab ' + (this.tabs.length));
    this.tabcontent.push({} as any);
    this.selected = this.tabs.length - 1;
  }
  ngOnInit() {
  }

}

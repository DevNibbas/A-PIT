import { Component, OnInit } from '@angular/core';
import { Apirequest } from './../interface/Apirequest';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})
export class TestpageComponent implements OnInit {


  request: Apirequest = {} as Apirequest;


  constructor() {
    this.request.method = 'get';


  }

  ngOnInit() {
  }

}

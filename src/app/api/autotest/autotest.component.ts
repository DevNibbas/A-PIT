import { Component, OnInit } from '@angular/core';
import { ApirequestService } from 'src/app/api/apirequest.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-autotest',
  templateUrl: './autotest.component.html',
  styleUrls: ['./autotest.component.scss']
})

export class AutotestComponent implements OnInit {

  constructor(private apiService:ApirequestService) { 
    
  }

  ngOnInit() {

  }

}

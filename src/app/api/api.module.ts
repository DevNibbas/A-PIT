import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import { ApiRoutingModule } from './api-routing.module';
import { TestpageComponent } from './testpage/testpage.component';
import { ViewcollectionComponent } from './viewcollection/viewcollection.component';
import { EnvironmentComponent } from './environment/environment.component';
import { AutotestComponent } from './autotest/autotest.component';
import { CreatescrapdataComponent } from './createscrapdata/createscrapdata.component';
import { SetupmodeldataComponent } from './setupmodeldata/setupmodeldata.component';
import { SetupcookiesComponent } from '../setupcookies/setupcookies.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MaincontainerComponent } from '../maincontainer/maincontainer.component';
import { ApiuiwrapperComponent } from '../apiuiwrapper/apiuiwrapper.component';


@NgModule({
  declarations: [
    TestpageComponent,
    ViewcollectionComponent,
    EnvironmentComponent,
    AutotestComponent,
    CreatescrapdataComponent,
    SetupmodeldataComponent,
    SetupcookiesComponent,
    NavbarComponent,
    SidebarComponent,
    MaincontainerComponent,
    ApiuiwrapperComponent,


  ],
  imports: [
    CommonModule,
    ApiRoutingModule,
    MatSelectModule,
  ]
})
export class ApiModule { }

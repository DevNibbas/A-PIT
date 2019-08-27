import { ApiuiwrapperComponent } from './../apiuiwrapper/apiuiwrapper.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestpageComponent } from './testpage/testpage.component';
import { ViewcollectionComponent } from './viewcollection/viewcollection.component';
import { SetupmodeldataComponent } from './setupmodeldata/setupmodeldata.component';
import { EnvironmentComponent } from './environment/environment.component';
import { AutotestComponent } from './autotest/autotest.component';


const routes: Routes = [
  {
    path: '', component: ApiuiwrapperComponent, children: [
      {
        path: '', component: TestpageComponent
      },
      {
        path: 'test', component: TestpageComponent
      },
      {
        path: 'collection', component: ViewcollectionComponent
      },
      {
        path: 'model', component: SetupmodeldataComponent
      },
      {
        path: 'env', component: EnvironmentComponent
      },
      {
        path: 'autotest', component: AutotestComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiRoutingModule { }

import { AuthGuard } from '../auth/auth.guard';
import { ApiuiwrapperComponent } from './../apiuiwrapper/apiuiwrapper.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestpageComponent } from './testpage/testpage.component';
import { ViewcollectionComponent } from './viewcollection/viewcollection.component';
import { SetupmodeldataComponent } from './setupmodeldata/setupmodeldata.component';
import { EnvironmentComponent } from './environment/environment.component';
import { AutotestComponent } from './autotest/autotest.component';
import { TabcontrolledhomeComponent } from './tabcontrolledhome/tabcontrolledhome.component';


const routes: Routes = [
  {
    path: '', component: ApiuiwrapperComponent, children: [
      {
        path: '', component: TabcontrolledhomeComponent, canActivate: [AuthGuard]
      },
      {
        path: 'test', component: TestpageComponent, canActivate: [AuthGuard]
      },
      {
        path: 'collection', component: ViewcollectionComponent, canActivate: [AuthGuard]
      },
      {
        path: 'model', component: SetupmodeldataComponent, canActivate: [AuthGuard]
      },
      {
        path: 'env', component: EnvironmentComponent, canActivate: [AuthGuard]
      },
      {
        path: 'autotest', component: AutotestComponent, canActivate: [AuthGuard]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiRoutingModule { }

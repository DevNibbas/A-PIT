import { LandingpageComponent } from './landingpage/landingpage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes =
  [
    {
      path: '', component: LandingpageComponent
    },
    {
      path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
      path: 'api', loadChildren: () => import('./api/api.module').then(m => m.ApiModule)
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

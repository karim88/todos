import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogoutComponent} from './modules/auth/components/logout/logout.component';
import {AppComponent} from './app.component';
import {ProtectedGuard, PublicGuard} from 'ngx-auth';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        canActivate: [PublicGuard],
        loadChildren: './modules/auth/auth.module#AuthModule'
      },
      {
        path: 'home',
        loadChildren: './modules/projects/projects.module#ProjectsModule',
      },
      {
        path: 'logout',
        canActivate: [ProtectedGuard],
        component: LogoutComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

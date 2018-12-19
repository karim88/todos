import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogoutComponent} from './modules/auth/components/logout/logout.component';
import {AppComponent} from './app.component';
import {ProtectedGuard, PublicGuard} from 'ngx-auth';

const routes: Routes = [
  {
    path: 'auth',
    component: AppComponent,
    children: [
      {
        path: '',
        canActivate: [PublicGuard],
        loadChildren: './modules/auth/auth.module#AuthModule'
      },
      {
        path: 'logout',
        canActivate: [ProtectedGuard],
        component: LogoutComponent
      }
    ],
  },
  {
    path: '',
    component: AppComponent,
    canActivate: [ProtectedGuard],
    children: [
      {
        path: '',
        loadChildren: './modules/projects/projects.module#ProjectsModule',
      }
    ]
  },
  {
    path: '',
    redirectTo: 'shops/nearby',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

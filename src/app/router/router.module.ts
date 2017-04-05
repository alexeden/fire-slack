import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FireSlackServicesModule } from 'fire-slack/app/services';
import { LoginComponent } from 'fire-slack/app/layout';
import { AuthGuard, UnauthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/channels',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    FireSlackServicesModule,
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    UnauthGuard
  ]
})
export class FireSlackRouterModule {}

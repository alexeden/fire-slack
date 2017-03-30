import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FireSlackServicesModule } from 'fire-slack/app/services';
import { ChannelsComponent } from 'fire-slack/app/channels';
import { LoginComponent } from 'fire-slack/app/layout';
import { AuthGuard, UnauthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ UnauthGuard ]
  },
  {
    path: 'channels',
    component: ChannelsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FireSlackServicesModule
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

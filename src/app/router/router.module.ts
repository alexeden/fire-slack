import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FireSlackServicesModule } from 'fire-slack/app/services';
import { ChannelsComponent } from 'fire-slack/app/channels';

const routes: Routes = [
  {
    path: 'channels',
    component: ChannelsComponent
  },
  {
    path: '',
    redirectTo: '/channels',
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
  ]
})
export class FireSlackRouterModule {}

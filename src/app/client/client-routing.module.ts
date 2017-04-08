import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FireSlackServicesModule } from 'fire-slack/app/services';
import { AuthGuard } from 'fire-slack/app/router/auth-guard.service';

import { ClientWrapperComponent } from './client-wrapper.component';
import { ClientMainComponent } from './main/client-main.component';
import { NoConversationSelectedComponent } from './main/no-conversation-selected.component';
import { CreateChannelOverlayComponent } from './overlays/create-channel.component';

const routes: Routes = [
  {
    path: 'client',
    component: ClientWrapperComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'create',
        outlet: 'overlay',
        component: CreateChannelOverlayComponent
      },
      {
        path: '',
        children: [
          {
            path: ':cid',
            component: ClientMainComponent
          },
          {
            path: '',
            component: NoConversationSelectedComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FireSlackServicesModule
  ],
  exports: [
    RouterModule
  ]
})
export class FireSlackClientRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FireSlackServicesModule } from 'fire-slack/app/services';

import { ChannelsComponent } from './channels.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ChannelListComponent } from './list/channel-list.component';
import { CreateChannelOverlayComponent } from './overlays/create-channel.component';

const routes: Routes = [
  {
    path: 'channels',
    component: ChannelsComponent,
    children: [
      {
        path: '',
        component: ChannelListComponent,
        children: [
          {
            path: ':id',
            component: ConversationComponent
          },
          {
            path: '',
            component: ConversationComponent
          }
        ]
      },
      {
        path: 'create-channel',
        component: CreateChannelOverlayComponent,
        outlet: 'overlay'
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
export class FireSlackChannelRouterModule {}

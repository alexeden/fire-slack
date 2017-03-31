import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FireSlackServicesModule } from 'fire-slack/app/services';

import { ChannelsComponent } from './channels.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ChannelListComponent } from './list/channel-list.component';

const routes: Routes = [
  {
    path: '',
    component: ChannelsComponent,
    children: [
      {
        path: '',
        component: ChannelListComponent,
        children: [
          {
            path: ':id',
            component: ConversationComponent
          }
          // {
          //   path: '',
          //   component: ConversationComponent
          // }
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
export class FireSlackChannelRouterModule {}

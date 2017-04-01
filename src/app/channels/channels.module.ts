import { NgModule } from '@angular/core';
import { SharedModule } from 'fire-slack/shared';

import { FireSlackChannelRouterModule } from './channel-router.module';
import { ChannelsComponent } from './channels.component';
import { ConversationComponent } from './conversation/conversation.component';
import { MessageComponent } from './conversation/message.component';
import { ChannelListItemComponent } from './list/channel-list-item.component';
import { ChannelListComponent } from './list/channel-list.component';
import { CreateChannelOverlayComponent } from './overlays/create-channel.component';

@NgModule({
  imports: [
    FireSlackChannelRouterModule,
    SharedModule
  ],
  declarations: [
    ChannelsComponent,
    ConversationComponent,
    MessageComponent,
    ChannelListItemComponent,
    ChannelListComponent,
    CreateChannelOverlayComponent
  ],
  exports: [
    ChannelsComponent
  ]
})
export class FireSlackChannelsModule {}
export * from './channels.component';

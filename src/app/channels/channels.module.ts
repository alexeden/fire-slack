import { NgModule } from '@angular/core';
import { SharedModule } from 'fire-slack/shared';

import { ChannelsComponent } from './channels.component';
import { ConversationComponent } from './conversation/conversation.component';
import { MessageComponent } from './conversation/message.component';
import { ChannelListItemComponent } from './list/channel-list-item.component';
import { ChannelListComponent } from './list/channel-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ChannelsComponent,
    ConversationComponent,
    MessageComponent,
    ChannelListItemComponent,
    ChannelListComponent
  ],
  exports: [
    ChannelsComponent
  ]
})
export class FireSlackChannelsModule {}
export * from './conversation/conversation.component';
export * from './conversation/message.component';
export * from './list/channel-list-item.component';
export * from './list/channel-list.component';

import { NgModule } from '@angular/core';
import { SharedModule } from 'fire-slack/shared';

import { ConversationComponent } from './conversation/conversation.component';
import { MessageComponent } from './conversation/message.component';
import { ChannelListItemComponent } from './list/channel-list-item.component';
import { ChannelListComponent } from './list/channel-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ConversationComponent,
    MessageComponent,
    ChannelListItemComponent,
    ChannelListComponent
  ],
  exports: [
    ConversationComponent,
    MessageComponent,
    ChannelListItemComponent,
    ChannelListComponent
  ]
})
export class FireSlackChannelsModule {}
export * from './conversation/conversation.component';
export * from './conversation/message.component';
export * from './list/channel-list-item.component';
export * from './list/channel-list.component';

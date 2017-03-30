import { NgModule } from '@angular/core';
import { SharedModule } from 'fire-slack/shared';

import { ChannelWindowComponent } from './channel-window.component';
import { ChannelMessageComponent } from './message.component';
import { ChannelListItemComponent } from './channel-list-item.component';
import { ChannelListComponent } from './channel-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ChannelWindowComponent,
    ChannelMessageComponent,
    ChannelListItemComponent,
    ChannelListComponent
  ],
  exports: [
    ChannelWindowComponent,
    ChannelMessageComponent,
    ChannelListItemComponent,
    ChannelListComponent
  ]
})
export class FireSlackChannelsModule {}
export * from './channel-window.component';
export * from './message.component';
export * from './channel-list-item.component';
export * from './channel-list.component';

import { NgModule } from '@angular/core';
import { SharedModule } from 'fire-slack/shared';

import { FireSlackClientScopesModule } from '../scopes';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { ChannelListItemComponent } from './channel-list/channel-list-item.component';

@NgModule({
  imports: [
    SharedModule,
    FireSlackClientScopesModule
  ],
  declarations: [
    ChannelListComponent,
    ChannelListItemComponent
  ],
  exports: [
    ChannelListComponent
  ]
})
export class FireSlackClientNavigationModule {}

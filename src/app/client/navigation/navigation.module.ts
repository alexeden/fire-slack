import { NgModule } from '@angular/core';
import { SharedModule } from 'fire-slack/shared';

import { FireSlackClientScopesModule } from '../scopes';
import { ClientNavigationComponent } from './navigation.component';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { ChannelListItemComponent } from './channel-list/channel-list-item.component';

@NgModule({
  imports: [
    SharedModule,
    FireSlackClientScopesModule
  ],
  declarations: [
    ClientNavigationComponent,
    ChannelListComponent,
    ChannelListItemComponent
  ],
  exports: [
    ChannelListComponent,
    ClientNavigationComponent
  ]
})
export class FireSlackClientNavigationModule {}
export { ClientNavigationComponent } from './navigation.component';

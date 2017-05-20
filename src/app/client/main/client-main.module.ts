import { NgModule } from '@angular/core';
import { SharedModule } from 'fire-slack/shared';

import { FireSlackClientScopesModule } from '../scopes';
import { ChannelSettingsComponent } from './channel-settings.component';
import { ClientMainComponent } from './client-main.component';
import { NoConversationSelectedComponent } from './no-conversation-selected.component';
import { MessageComponent } from './message.component';

@NgModule({
  imports: [
    SharedModule,
    FireSlackClientScopesModule
 ],
  declarations: [
    ClientMainComponent,
    MessageComponent,
    NoConversationSelectedComponent,
    ChannelSettingsComponent
  ],
  exports: []
})
export class FireSlackClientMainModule {}

import { NgModule } from '@angular/core';

import { ChannelService } from './channels.service';
import { UserService } from './user.service';
import { MessageService } from './messages.service';

@NgModule({
  providers: [
    UserService,
    ChannelService,
    MessageService
  ]
})
export class RxChatServicesModule {}


export { ChannelService } from './channels.service';
export { UserService } from './user.service';
export { MessageService } from './messages.service';

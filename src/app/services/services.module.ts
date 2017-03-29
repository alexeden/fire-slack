import { NgModule } from '@angular/core';

import { ChannelService } from './channels.service';
import { UserService } from './user.service';
import { MessageService } from './messages.service';
import { FirebaseService } from './firebase.service';

@NgModule({
  providers: [
    UserService,
    ChannelService,
    MessageService,
    FirebaseService
  ]
})
export class FireSlackServicesModule {}
export * from './channels.service';
export * from './firebase.service';
export * from './user.service';
export * from './messages.service';

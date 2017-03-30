import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { ChannelService } from './channels.service';
import { FirebaseService } from './firebase.service';
import { MessageService } from './messages.service';
import { UserService } from './user.service';

@NgModule({
  providers: [
    AuthService,
    ChannelService,
    FirebaseService,
    MessageService,
    UserService
  ]
})
export class FireSlackServicesModule {}
export * from './auth.service';
export * from './channels.service';
export * from './firebase.service';
export * from './messages.service';
export * from './user.service';

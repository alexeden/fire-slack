import { Component, Inject } from '@angular/core';
import { MessageService, ChannelService, UserService, FirebaseService } from 'fire-slack/app/services';

@Component({
  selector: 'fire-slack-app',
  // <nav-bar></nav-bar>
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(
    @Inject(MessageService) private messageService: MessageService,
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(UserService) private userService: UserService,
    @Inject(FirebaseService) private firebase: FirebaseService
  ) {}
}

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
    @Inject(MessageService) public messageService: MessageService,
    @Inject(ChannelService) public channelService: ChannelService,
    @Inject(UserService) public userService: UserService,
    @Inject(FirebaseService) public firebase: FirebaseService
  ) {}
}

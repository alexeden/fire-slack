import { Component, Inject } from '@angular/core';
import { RxChatData } from 'app/data.provider';
import { MessageService, ChannelService, UserService } from 'app/services';

@Component({
  selector: 'chat-app',
  template: `
  <nav-bar></nav-bar>
  <div class="container-fluid px-0">
    <div class="row mx-0">
      <div class="col-md-4 col-lg-3 col-xl-2 mx-0 px-0">
        <channel-list></channel-list>
      </div>
      <div class="col-md-8 col-lg-9 col-xl-10 px-1 mx-0">
        <channel-window></channel-window>
      </div>
    </div>
  </div>
  `
})
export class AppComponent {
  constructor(
    @Inject(MessageService) private messageService: MessageService,
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(UserService) private userService: UserService,
    @Inject(RxChatData) private data: void
  ) {}
}

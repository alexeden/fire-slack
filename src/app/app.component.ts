import { Component, Inject } from '@angular/core';
// import { FireSlackData } from 'app/data.provider';
import { MessageService, ChannelService, UserService, FirebaseService } from 'fire-slack/app/services';

@Component({
  selector: 'fire-slack-app',
  template: `
  <div class="container-fluid px-0">
    <div class="row mx-0">
      <div class="col-md-4 col-lg-4 col-xl-3 mx-0 px-0" style="z-index: 10; background-color: #ffffff; box-shadow: 1px 0 3px rgba(0,0,0,0.06), 1px 0 2px rgba(0,0,0,0.12);">
        <channel-list></channel-list>
      </div>
      <div class="col-md-8 col-lg-8 col-xl-9 px-0 mx-0">
        <nav-bar></nav-bar>
        <channel-window></channel-window>
      </div>
    </div>
  </div>
  `
})
export class AppComponent {
  constructor
    ( @Inject(MessageService) private messageService: MessageService
    , @Inject(ChannelService) private channelService: ChannelService
    , @Inject(UserService) private userService: UserService
    , @Inject(FirebaseService) private firebase: FirebaseService
    // @Inject(FireSlackData) private data: void
    ) {
    }
}

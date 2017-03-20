import { Component, Inject } from '@angular/core';
import { RxChatData } from 'app/data.provider';
import { MessageService, ChannelService, UserService } from 'app/services';

@Component({
  selector: 'chat-app',
  template: `
  <nav class="navbar navbar-full navbar-dark bg-inverse">
    <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        Messages <span class="label label-pill label-info">0</span>
      </li>
    </ul>
  </nav>
    <div class="container-fluid p-x-0">
      <div class="row">
        <div class="col-md-4 m-x-0 p-r-0">
          <channel-list></channel-list>
        </div>
        <div class="col-md-8 p-x-0 m-x-0">
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

import { Component } from '@angular/core';
import { ChannelService } from 'app/services';


@Component({
  selector: 'channel-list',
  template: `<h1>hi!</h1>`
})
export class ChannelListComponent {
  constructor(
    private channelService: ChannelService
  ) {}

}

import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { ChannelService } from 'app/services';
import { Channel } from 'app/interfaces';




@Component({
  selector: 'channel-list',
  template: `
    <div
      class="card media m-y-0 container-fluid"
      style="border-top-width: 0;"
      *ngFor="let channel of channels$ | async"
      (click)="setActiveChannel(channel)">

      <div class="card-block media m-y-0">
        <div class="media-left media-top">
          <img class="media-object square-64 img-circle hidden-xs-down" src="{{channel.avatarSrc}}">
        </div>
        <div class="media-body">
          <p class="card-title lead m-y-0">{{channel.name}} {{activeChannelId$ | async}}</p>
          <p class="card-text"><small class="text-muted">{{channel?.lastMessage?.text}}</small></p>
        </div>
      </div>

    </div>
  `
})
export class ChannelListComponent {
  private channels$: Observable<Channel[]>;
  private activeChannelId$: Observable<string>;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService
  ) {
    this.channels$ = channelService.channels$;
    this.activeChannelId$ = channelService.activeChannel$.map(channel => channel.id);
  }

  setActiveChannel(channel: Channel) {
    this.channelService.setActiveChannel(channel);
  }

}

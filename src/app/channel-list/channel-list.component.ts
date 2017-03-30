import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { ChannelService } from 'fire-slack/app/services';
import { Channel } from 'app/interfaces';




@Component({
  selector: 'channel-list',
  template: `
    <ul class="list-group">
      <channel-list-item *ngFor="let channel of channels$ | async" [channel]="channel"></channel-list-item>
    </ul>
  `
})
export class ChannelListComponent {
  private channels$: Observable<Channel[]>;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService
  ) {
    this.channels$ = channelService.channels$;
  }
}

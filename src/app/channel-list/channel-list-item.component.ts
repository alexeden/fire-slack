import { Observable } from 'rxjs';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ChannelService, MessageService } from 'app/services';
import { Channel, Message } from 'app/interfaces';
import { tag$ } from 'util/tags';


@Component({
  selector: 'channel-list-item',
  templateUrl: './channel-list-item.html'
})
export class ChannelListItemComponent implements OnInit {
  @Input() channel: Channel;
  private isActive$: Observable<boolean>;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(MessageService) private messageService: MessageService
  ) {}

  ngOnInit() {
    this.isActive$ = this.channelService.activeChannel$.map(channel => channel.id === this.channel.id);
  }

  setActiveChannel(channel: Channel) {
    this.channelService.setActiveChannel(channel);
  }

}

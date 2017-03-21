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
  private latestMessage$: Observable<Message>;
  private latestMessageContent$: Observable<string>;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(MessageService) private messageService: MessageService
  ) {}

  ngOnInit() {
    this.isActive$ = this.channelService.activeChannel$.map(channel => channel.id === this.channel.id);

    this.latestMessage$
      = this.messageService.messages$
          .map((messages): Message | null =>
            messages.reduce(
              (match: Message, msg) =>
                msg.channel.id === this.channel.id
                ? msg
                : match,
              null
            )
          );

    this.latestMessageContent$ = this.latestMessage$.map(message => message && message.content || 'No messages yet');
  }

  setActiveChannel(channel: Channel) {
    this.channelService.setActiveChannel(channel);
  }

}

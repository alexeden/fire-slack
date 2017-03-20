import { Observable } from 'rxjs';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ChannelService, MessageService } from 'app/services';
import { Channel, Message } from 'app/interfaces';
import { tag$ } from 'util/tags';
import { last } from 'ramda';




@Component({
  selector: 'channel-list-item',
  template: `
  <div
    class="card media m-y-0 container-fluid"
    style="border-top-width: 0;"
    (click)="setActiveChannel(channel)"
    [ngClass]="{'card-primary': (isActive$ | async), 'card-inverse': !(isActive$ | async)}">


    <div class="card-block media m-y-0">
      <div class="media-left media-top">
        <img class="media-object square-64 img-circle hidden-xs-down" src="{{channel.avatarSrc}}">
      </div>
      <div class="media-body">
        <p class="card-title lead m-y-0">{{channel.name}}</p>
        <p class="card-text"><small class="text-muted">{{latestMessageContent$ | async}}</small></p>
      </div>
    </div>
  </div>
  `
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
              (match: Message, msg) => msg.channel.id === this.channel.id ? msg : match,
              null
            )
          );

    this.latestMessageContent$ = this.latestMessage$.map(message => message && message.content || 'No messages yet');
  }

  setActiveChannel(channel: Channel) {
    this.channelService.setActiveChannel(channel);
  }

}

import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { ChannelService, MessageService } from 'app/services';
import { Channel, Message } from 'app/interfaces';


@Component({
  selector: 'channel-window',
  templateUrl: './channel-window.html'
})
export class ChannelWindowComponent {

  private activeChannel$: Observable<Channel>;
  private channelName$: Observable<string>;
  private channelMessages$: Observable<Message[]>;
  private noMessagesYet$: Observable<boolean>;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(MessageService) private messageService: MessageService
  ) {
    this.activeChannel$ = channelService.activeChannel$;
    this.channelName$ = this.activeChannel$.map(channel => channel.name);
    this.channelMessages$
      = this.activeChannel$
          .map(channel => channel.id)
          .mergeMap(id => this.messageService.messagesForChannelId(id));

    this.noMessagesYet$ = this.channelMessages$.map(msgs => msgs.length < 1);
  }

  sendMessage(input: HTMLInputElement) {
    this.activeChannel$
      .take(1)
      .do(channel =>
        this.messageService.createMessage({
          content: input.value,
          channel
        })
      )
      .subscribe(_ => input.value = '');


  }
}

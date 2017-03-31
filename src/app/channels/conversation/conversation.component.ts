import { Observable } from 'rxjs';
import { Component, Inject, ElementRef, Host } from '@angular/core';
import { ChannelService, MessageService } from 'fire-slack/app/services';
import { Channel, Message } from 'fire-slack/app/interfaces';
import { tag$ } from 'util/tags';


@Component({
  selector: 'conversation',
  templateUrl: './conversation.html',
  styles: [`
    .channel-messages {
      overflow: scroll;
    }
    .channel-header {
      box-shadow: 0 1px 5px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.17);
    }
    .channel-footer {
      box-shadow: 0 -1px 5px rgba(0,0,0,0.08), 0 -1px 2px rgba(0,0,0,0.17);
    }
  `]
})
export class ConversationComponent {

  private activeChannel$: Observable<Channel>;
  private channelName$: Observable<string>;
  private channelMessages$: Observable<Message[]>;
  private noMessagesYet$: Observable<boolean>;

  private height$: Observable<number>;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(MessageService) private messageService: MessageService,
    @Inject(ElementRef) @Host() private elementRef: ElementRef
  ) {
    this.activeChannel$ = channelService.activeChannel$;
    this.channelName$ = this.activeChannel$.map(channel => channel.name);
    this.channelMessages$
      = this.activeChannel$
          .map(channel => channel.id)
          .mergeMap(id => this.messageService.messagesForChannelId(id));

    this.noMessagesYet$ = this.channelMessages$.map(msgs => msgs.length < 1);

    this.height$
      = Observable.merge(
          Observable.interval(200).take(10),
          Observable.fromEvent(window, 'resize')
        )
        .startWith(null)
        .mapTo(this.elementRef.nativeElement)
        .map(elem => elem.getBoundingClientRect())
        .map(({top}) => window.innerHeight - top);
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

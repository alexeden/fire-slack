import { Component, Inject, ElementRef, Host, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChannelService, MessageService } from 'fire-slack/app/services';
import { Channel, Message, DataSnapshot } from 'fire-slack/app/interfaces';
import { tag$ } from 'fire-slack/util/tags';


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
export class ConversationComponent implements OnDestroy {

  private channel$: Observable<Channel>;
  private channelName$: Observable<string>;
  private channelMessages$: Observable<Message[]>;
  private noMessagesYet$: Observable<boolean>;

  private height$: Observable<number>;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(MessageService) private messageService: MessageService,
    @Inject(ElementRef) @Host() private elementRef: ElementRef,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router
  ) {
    console.log('constructing ConversationComponent');
    this.channel$
      = this.route.params.pluck('cid')
          .switchMap((cid: string): Observable<Channel> =>
            this.channelService.channelsRef$
              .map(dataSnapshot => dataSnapshot.child(cid).val())
          );

    this.channelName$ = this.channel$.map(channel => channel.name);
    // this.channelMessages$
    //   = this.channel$
    //       .map(channel => channel.cid || '')
    //       .mergeMap(id => this.messageService.messagesForChannelId(id));
    //
    // this.noMessagesYet$ = this.channelMessages$.map(msgs => msgs.length < 1);
    //
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

  ngOnDestroy() {
    console.log('destroying conversation component');
  }

  sendMessage(input: HTMLInputElement) {
    // this.channel$
    //   .take(1)
    //   .do(channel =>
    //     this.messageService.createMessage({
    //       content: input.value,
    //       channel
    //     })
    //   )
    //   .subscribe(_ => input.value = '');
  }
}

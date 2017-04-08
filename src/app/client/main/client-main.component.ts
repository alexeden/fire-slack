import { Component, Inject, ElementRef, Host, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChannelService, MessageService, FirebaseService } from 'fire-slack/app/services';
import { Channel, Message, DataSnapshot } from 'fire-slack/app/interfaces';
import { tag$ } from 'fire-slack/util/tags';


@Component({
  selector: 'main',
  templateUrl: './client-main.html',
  styles: [`
    .channel-messages {
      overflow: scroll;
    }
  `]
})
export class ClientMainComponent implements OnDestroy, OnInit {

  private channel$: Observable<Channel>;
  private channelRef$: Observable<DataSnapshot>;
  private channelName$: Observable<string>;
  private cid$: Observable<string>;
  private messagesRef$: Observable<DataSnapshot>;
  private messages$: Observable<Message[]>;
  private noMessagesYet$: Observable<boolean>;

  private height$: Observable<number>;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(MessageService) private messageService: MessageService,
    @Inject(ElementRef) @Host() private elementRef: ElementRef,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router
  ) {
    this.cid$ = this.route.params.pluck('cid');

    this.channelRef$ = this.cid$.switchMap(cid => this.channelService.channelById(cid));
    this.messagesRef$ = this.cid$.switchMap(cid => this.messageService.messagesByChannelId(cid));

    this.channel$ = this.channelRef$.map(snapshot => snapshot.val());

    this.messages$
      = this.messagesRef$
          .map((snapshot): {[id: string]: Message} => snapshot.val())
          .map(data => FirebaseService.addKeyAsPropOfValue('id', data || {}))
          .map(data => Object.values(data));

    this.noMessagesYet$ = this.messages$.map(msgs => msgs.length < 1);
    this.channelName$ = this.channel$.map(channel => channel.name).startWith('channel');

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

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngOnDestroy() {
    console.log('destroying conversation component');
  }

  deleteMessage(message: Message) {
    this.messageService.deleteMessage(message);
  }

  sendMessage(input: HTMLInputElement) {
    if(input.value.length < 1) return;

    this.cid$
      .switchMap(cid => this.messageService.sendMessage(cid, input.value))
      .take(1)
      .subscribe(mid =>
        console.log(`success creating message: `, mid)
      );
  }
}

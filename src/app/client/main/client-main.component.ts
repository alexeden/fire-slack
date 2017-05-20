import { Component, Inject, ElementRef, Host, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChannelService, MessageService, FirebaseService } from 'fire-slack/app/services';
import { Channel, Message, DataSnapshot } from 'fire-slack/app/interfaces';


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

  channel$: Observable<Channel>;
  channelRef$: Observable<DataSnapshot>;
  channelName$: Observable<string>;
  cid$: Observable<string>;
  messagesRef$: Observable<DataSnapshot>;
  messages$: Observable<Message[]>;
  noMessagesYet$: Observable<boolean>;

  showChannelSettings$ = new BehaviorSubject<boolean>(false);
  height$: Observable<number>;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(MessageService) private messageService: MessageService,
    @Inject(ElementRef) @Host() private elementRef: ElementRef,
    @Inject(ActivatedRoute) private route: ActivatedRoute
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
      .subscribe(mid => input.value = '');
  }

  toggleShowChannelSettings() {
    this.showChannelSettings$
      .take(1)
      .subscribe(show =>
        this.showChannelSettings$.next(!show)
      );
  }
}

import { Injectable, Inject } from '@angular/core';
import { ConnectableObservable, Subject, BehaviorSubject, Observable } from 'rxjs';
import { tag$, tag } from 'util/tags';
import { v1 } from 'uuid';
import { Channel, ChannelOperation, Message, ChannelListOperation } from 'app/interfaces';
import { MessageService } from './messages.service';


@Injectable()
export class ChannelService {
  private operations$: Subject<ChannelListOperation>;
  channels$: ConnectableObservable<Channel[]>;
  private activeChannelSource$: BehaviorSubject<Channel>;
  activeChannel$: Observable<Channel>;


  constructor(
    @Inject(MessageService) private messageService: MessageService
  ) {
    this.operations$ = new Subject();

    this.channels$
      = this.operations$
          .scan(
            (msgs, operation) => operation(msgs),
            [] as Channel[]
          )
          .do(tag$('channels'))
          .publishReplay(1);

    this.activeChannelSource$ = new BehaviorSubject({} as Channel);

    this.activeChannel$
      = this.activeChannelSource$.asObservable()
          .filter(channel => !!(channel && channel.id && channel.id.length > 0))
          .distinctUntilChanged()
          .combineLatest(
            this.messageService.messages$,
            (channel: Channel, msgs: Message[]): Channel => (
              {
                ...channel,
                messages: msgs.filter(msg => msg.channel.id === channel.id)
              }
            )
          )
          .do(tag$('activeChannel'));




    this.channels$.connect();

  }

  createChannel(channel: Channel) {
    const newChannel = { ...channel, id: channel.id || v1() };
    this.operations$.next(channels => [...channels, newChannel]);
  }

  setActiveChannel(channel: Channel) {
    this.activeChannelSource$.next(channel);
  }


}

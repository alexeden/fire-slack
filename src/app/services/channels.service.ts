import { Injectable, Inject } from '@angular/core';
import { ConnectableObservable, Subject, BehaviorSubject, Observable } from 'rxjs';
import { tag, tag$ }  from 'util/tags';
import { v1 } from 'uuid';
import { Channel, PartialChannel, ChannelListOperation } from 'app/interfaces';
import { MessageService } from './messages.service';


@Injectable()
export class ChannelService {
  private operations$: Subject<ChannelListOperation>;
  private activeChannelSource$: BehaviorSubject<Channel>;

  channels$: ConnectableObservable<Channel[]>;
  activeChannel$: Observable<Channel>;

  constructor(
    @Inject(MessageService) private messageService: MessageService
  ) {
    this.operations$ = new Subject();

    this.channels$
      = this.operations$
          .scan(
            (channels, operation) => operation(channels),
            [] as Channel[]
          )
          .publishReplay(1);

    this.activeChannelSource$ = new BehaviorSubject({} as Channel);

    this.activeChannel$
      = this.activeChannelSource$.asObservable()
          .filter(channel => !!(channel && channel.id && channel.id.length > 0))
          .distinctUntilKeyChanged('id');

    this.channels$.connect();
  }

  createChannel(channel: PartialChannel) {
    this.operations$.next(channels => [
      ...channels,
      {
        ...channel,
        id: channel.id || v1(),
        isPrivate: channel.isPrivate || false
      } as Channel
    ]);
  }

  setActiveChannel(channel: Channel) {
    this.activeChannelSource$.next(channel);
  }


}

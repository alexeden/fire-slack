import { Injectable, Inject } from '@angular/core';
import { ConnectableObservable, Observable } from 'rxjs';
import { tag, tag$ }  from 'fire-slack/util/tags';
import { Channel, DataSnapshot, DbReference } from 'fire-slack/app/interfaces';
import { FirebaseService } from './firebase.service';
import { AuthService } from './auth.service';
import { MessageService } from './messages.service';


@Injectable()
export class ChannelService {
  private channelsRef: DbReference;
  channels$: ConnectableObservable<Channel[]>;
  activeChannel$: Observable<Channel>;

  constructor(
    @Inject(FirebaseService) private firebase: FirebaseService,
    @Inject(MessageService) private messageService: MessageService,
    @Inject(AuthService) private authService: AuthService
  ) {
    this.channelsRef = this.firebase.database.ref('channels');

    const channelsQuery =
      Observable.bindCallback(
        cb => this.channelsRef.on('value', cb),
        (data: any): DataSnapshot => data
      );

    this.channels$ =
      channelsQuery()
        .map((data): {[cid: string]: Channel} => data.val())
        .filter(val => val !== null)
        .map(channelObj => Object.keys(channelObj).map(cid => channelObj[cid]))
        .publishReplay(1);



    this.activeChannel$
      = this.channels$
          .map(channels => channels[0])
          .filter(channel => !!(channel && channel.cid && channel.cid.length > 0))
          .distinctUntilKeyChanged('cid');

    this.channels$.connect();
  }

  createChannel(channel: Channel) {
    // this.operations$.next(channels => [
    //   ...channels,
    //   {
    //     ...channel,
    //     cid: channel.cid || v1(),
    //     private: channel.private || false
    //   } as Channel
    // ]);
  }

  setActiveChannel(channel: Channel) {
    // this.activeChannelSource$.next(channel);
  }


}

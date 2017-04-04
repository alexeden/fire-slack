import { Injectable, Inject } from '@angular/core';
import { ConnectableObservable, Observable } from 'rxjs';
import { tag, tag$ }  from 'fire-slack/util/tags';
import { Channel, DataSnapshot, Reference } from 'fire-slack/app/interfaces';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { MessageService } from './messages.service';


@Injectable()
export class ChannelService {
  private channelsRef: Reference;
  channelsRef$: ConnectableObservable<DataSnapshot>;
  channels$: Observable<Channel[]>;
  // activeChannel$: Observable<Channel>;

  constructor(
    @Inject(FirebaseService) private firebaseService: FirebaseService,
    @Inject(MessageService) private messageService: MessageService,
    @Inject(UserService) private userService: UserService
  ) {
    this.channelsRef = this.firebaseService.database.ref('channels');

    this.channelsRef$ = FirebaseService.observe(this.channelsRef).publishReplay(1);

    this.channels$
      = this.channelsRef$
          .map((data): {[cid: string]: Channel} => data.val())
          .filter(val => val !== null)
          .map(channelObj =>
            Object.keys(channelObj)
              .map(cid => (
                {
                  cid,
                  ...channelObj[cid]
                })
              )
          )
          .share();

    // this.activeChannel$
    //   = this.channels$
    //       .map(channels => channels[0])
    //       .filter(channel => !!(channel && channel.cid && channel.cid.length > 0))
    //       .distinctUntilKeyChanged('cid');

    this.channelsRef$.connect();
  }

  createChannel(partialChannel: Partial<Channel>): Observable<string> {
    return Observable.of(partialChannel || {})
      .withLatestFrom(this.userService.currentUid$)
      .map(([channel, uid]): Channel => (
        {
          ...channel,
          creator: uid,
          private: partialChannel.private || false,
          members: FirebaseService.filterIndexObject(channel.members || {}),
          timestamp: Date.now()
        }
      ))
      .mergeMap((channel): Observable<string> => {
        const newChannelRef = this.channelsRef.push();
        return Observable.fromPromise(
          newChannelRef.set(channel) as Promise<any>
        )
        .mapTo(newChannelRef.key);
      });
  }

  // cidExists(cid: string): boolean {
  //   this.channelsRef.child(cid).ex
  // }

  observeChannelById(cid: string): Observable<DataSnapshot> {
    return FirebaseService.observe(this.channelsRef.child(cid));
  }

  setActiveChannel(channel: Channel) {
    // this.activeChannelSource$.next(channel);
  }


}

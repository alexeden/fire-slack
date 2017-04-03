import { Injectable, Inject } from '@angular/core';
import { ConnectableObservable, Subject, Observable } from 'rxjs';
import { Message, MessageListOperation, DbReference } from 'fire-slack/app/interfaces';
import { FirebaseService } from './firebase.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';


@Injectable()
export class MessageService {

  private messagesRef: DbReference;
  private operations$: Subject<MessageListOperation>;
  messages$: ConnectableObservable<Message[]>;
  unseenMessages$: Observable<Message[]>;

  constructor(
    @Inject(AuthService) private authervice: AuthService,
    @Inject(FirebaseService) private firebase: FirebaseService
  ) {
    this.messagesRef = window['messagesRef'] = firebase.database.ref('messages');

    this.operations$ = new Subject();

    this.messages$
      = this.operations$
          .scan(
            (msgs, operation) => operation(msgs),
            [] as Message[]
          )
          .publishReplay(1);


    this.unseenMessages$
      = this.messages$
          .withLatestFrom(this.authervice.user$.map(user => user && user.uid))
          .map(([msgs, userId]) =>
            msgs.filter(msg => !msg.seenBy.includes(userId) && msg.author !== userId)
          );


    this.messages$.connect();

  }

  createMessage(message: Partial<Message>) {
    // this.userService.currentUser$
    //   .take(1)
    //   .subscribe(user =>
    //     this.operations$.next(messages => [
    //       ...messages,
    //       {
    //         ...message,
    //         author: message.author || user,
    //         id: message.id || v1(),
    //         timestamp: message.timestamp || moment().toDate(),
    //         seenBy: (message.seenBy || []).concat((message.author || user.uid))
    //       } as Message
    //     ])
    //   );
  }

  messagesForChannelId(channelId: string): Observable<Message[]> {
    return this.messages$
      .map(messages =>
        messages.filter(message => message.channel.cid === channelId)
      );
  }

  unseenMessagesForChannelId(channelId: string): Observable<Message[]> {
    return this.unseenMessages$
      .map(messages =>
        messages.filter(message => message.channel.cid === channelId)
      );
  }

  // markMessagesAsSeenForChannelId(channelId: string) {
  //   this.userService.currentUser$
  //     .take(1)
  //     .subscribe(currentUser =>
  //       this.operations$.next(
  //         messages =>
  //           messages.map(msg =>
  //             msg.channel.cid === channelId && !msg.seenBy.includes(currentUser.uid)
  //             ? { ...msg, seenBy: [...msg.seenBy, currentUser.uid] }
  //             : msg
  //           )
  //       )
  //     );
  // }

}

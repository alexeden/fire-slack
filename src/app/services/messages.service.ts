import { Injectable, Inject } from '@angular/core';
import { ConnectableObservable, Subject, Observable } from 'rxjs';
import { Message, MessageListOperation, Reference } from 'fire-slack/app/interfaces';
import { FirebaseService } from './firebase.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';


@Injectable()
export class MessageService {

  private messagesRef: Reference;
  private operations$: Subject<MessageListOperation>;
  messages$: ConnectableObservable<Message[]>;
  unseenMessages$: Observable<Message[]>;

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(FirebaseService) private firebaseService: FirebaseService
  ) {
    this.messagesRef = window['messagesRef'] = this.firebaseService.database.ref('messages');

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
          .withLatestFrom(this.userService.currentUid$)
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

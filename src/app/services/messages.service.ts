import * as moment from 'moment';
import { Injectable, Inject } from '@angular/core';
import { ConnectableObservable, Subject, Observable } from 'rxjs';
import { v1 } from 'uuid';
import { PartialMessage, Message, MessageListOperation } from 'app/interfaces';
import { UserService } from 'app/services/user.service';


@Injectable()
export class MessageService {

  private operations$: Subject<MessageListOperation>;
  messages$: ConnectableObservable<Message[]>;
  unseenMessages$: Observable<Message[]>;

  constructor(
    @Inject(UserService) private userService: UserService
  ) {
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
          .withLatestFrom(this.userService.currentUser$.map(user => user.id))
          .map(([msgs, userId]) =>
            msgs.filter(msg => !msg.seenBy.includes(userId) && msg.author.id !== userId)
          );


    this.messages$.connect();

  }

  createMessage(message: PartialMessage) {
    this.userService.currentUser$
      .take(1)
      .subscribe(user =>
        this.operations$.next(messages => [
          ...messages,
          {
            ...message,
            author: message.author || user,
            id: message.id || v1(),
            timestamp: message.timestamp || moment().toDate(),
            seenBy: (message.seenBy || []).concat((message.author || user).id)
          } as Message
        ])
      );
  }

  messagesForChannelId(channelId: string): Observable<Message[]> {
    return this.messages$
      .map(messages =>
        messages.filter(message => message.channel.id === channelId)
      );
  }

  unseenMessagesForChannelId(channelId: string): Observable<Message[]> {
    return this.unseenMessages$
      .map(messages =>
        messages.filter(message => message.channel.id === channelId)
      );
  }

  markMessagesAsSeenForChannelId(channelId: string) {
    this.userService.currentUser$
      .take(1)
      .subscribe(currentUser =>
        this.operations$.next(
          messages =>
            messages.map(msg =>
              msg.channel.id === channelId && !msg.seenBy.includes(currentUser.id)
              ? { ...msg, seenBy: [...msg.seenBy, currentUser.id] }
              : msg
            )
        )
      );
  }

}

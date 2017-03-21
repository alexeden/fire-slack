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
            timestamp: message.timestamp || moment().toDate()
          } as Message
        ])
      );
  }

  messagesForChannelId(channelId: string): Observable<Message[]> {
    return this.messages$
      .map(messages => messages.filter(message => message.channel.id === channelId));
  }





}

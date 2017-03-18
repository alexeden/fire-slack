import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable, Subject } from 'rxjs';
import { v1 } from 'uuid';
import { tag$ } from 'util/tags';
import { Message, MessageOperation, MessageListOperation } from 'app/interfaces';


@Injectable()
export class MessageService {

  private operations$: Subject<MessageListOperation>;
  messages$: ConnectableObservable<Message[]>;

  constructor() {
    this.operations$ = new Subject();

    this.messages$
      = this.operations$
          .scan(
            (msgs, operation) => operation(msgs),
            [] as Message[]
          )
          .do(tag$('messages'))
          .publishReplay(1);

    this.messages$.connect();

  }



}

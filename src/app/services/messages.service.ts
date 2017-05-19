import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, Reference, DataSnapshot, ThenableReference } from 'fire-slack/app/interfaces';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';


@Injectable()
export class MessageService {

  private messagesRef: Reference;

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(FirebaseService) private firebaseService: FirebaseService
  ) {
    this.messagesRef = this.firebaseService.database.ref('messages');
  }

  sendMessage(cid: string, content: string): Observable<ThenableReference> {

    return this.userService.currentUid$
      .map((uid: string): Message => (
        {
          author: uid,
          channel: cid,
          content,
          timestamp: Date.now(),
          seenBy: { [uid]: true }
        }
      ))
      .map(message => this.messagesRef.child(cid).push(message));
  }

  deleteMessage({channel, id}: Message): Observable<null|Error> {
    return Observable.fromPromise(
      this.messagesRef.child(`${channel}/${id}`).remove() as Promise<null|Error>
    );
  }

  messagesByChannelId(cid: string): Observable<DataSnapshot> {
    return FirebaseService.observe(this.messagesRef.child(cid));
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

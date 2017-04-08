import { Component, Input, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'fire-slack/app/interfaces';
import { UserService, MessageService } from 'fire-slack/app/services';


@Component({
  selector: 'message',
  styles: [`
    :host, .message {
      position: relative;
    }
    .message * {
      transition: all 0.3s;
    }
    .message .show-on-hover {
      transform: translateX(100%);
      max-width: 0;
      overflow: hidden;
      opacity: 0;
    }
    .message:hover .show-on-hover {
      max-width: none;
      transform: translateX(0%);
      opacity: 1;
    }
    .message__content {
      font-weight: 300;
      font-size: 0.9rem;
    }
    .message__label {
      color: rgba(121,121,121, 1);
      font-weight: 500;
      font-size: 0.8rem;
    }
    .message__label--timestamp {
      color: rgba(161,161,161, 1);
      font-weight: 300;
      font-style: italic;
    }
  `],
  template: `
    <div
      [userScope]="message.author"
      #user="userScope"
      class="media mb-4 px-4 message">

      <img
        class="mr-3 square-48 rounded-circle message__icon"
        src="{{(user?.userInfo$ | async)?.photoURL || '/assets/unknown-user.jpg'}}">

      <div class="media-body message__content">
        <p class="my-0">{{message?.content}}</p>
        <p class="mt-1 mb-0 message__label">
        {{(user?.userInfo$ | async)?.displayName}} <span class="message__label--timestamp">{{message?.timestamp | fromNow}}</span>
        </p>
      </div>
      <button
        *ngIf="sentByCurrentUser$ | async"
        class="d-flex align-self-center mx-0 px-2 show-on-hover btn btn-danger"
        type="button"
        (click)="removeHandler(message)">
        Delete
      </button>
    </div>
  `
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Input() removeHandler: (msg: Message) => void;
  private sentByCurrentUser$: Observable<boolean>;

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(MessageService) private messageService: MessageService
  ) {}

  ngOnInit() {
    this.sentByCurrentUser$ = this.userService.currentUid$.map(uid => uid === this.message.author);
  }

  // deleteMessage(cid: string, mid: string) {
  //   this.messageService.deleteMessage(
  //   console.log(`deleting message with id: ${mid}`);
  // }


}

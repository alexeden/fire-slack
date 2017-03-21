import { Component, Input, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Channel, Message } from 'app/interfaces';
import { UserService } from 'app/services';



@Component({
  selector: 'channel-message',
  template: `
    <li class="media mb-4">
      <template [ngIf]="sentByCurrentUser$ | async | not">
        <img
          class="mr-3 square-64 rounded-circle"
          src="{{message.author.avatarUrl}}">

        <div class="media-body">
          <p class="my-0 lead">{{message.content}}</p>
          <p class="my-0"><small class="text-muted"><em>Said by {{message.author.name}} {{message.timestamp | fromNow}}</em></small></p>
        </div>
      </template>

      <template [ngIf]="sentByCurrentUser$ | async">
        <div class="media-body text-right">
          <p class="my-0 lead">{{message.content}}</p>
          <p class="my-0"><small class="text-muted"><em>Said by {{message.author.name}} {{message.timestamp | fromNow}}</em></small></p>
        </div>

        <img
          class="d-flex ml-3 square-64 rounded-circle"
          src="{{message.author.avatarUrl || '/assets/unknown-user.jpg'}}">
      </template>
    </li>
  `
})
export class ChannelMessageComponent implements OnInit {
  @Input() message: Message;
  private sentByCurrentUser$: Observable<boolean>;

  constructor(
    @Inject(UserService) private userService: UserService
  ) {}

  ngOnInit() {
    this.sentByCurrentUser$ = this.userService.currentUser$.map(user => user.id === this.message.author.id);
  }


}

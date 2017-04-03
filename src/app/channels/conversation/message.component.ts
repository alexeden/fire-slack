import { Component, Input, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'fire-slack/app/interfaces';
import { AuthService } from 'fire-slack/app/services';


@Component({
  selector: 'message',
  template: `
    <div class="media mb-4">
      <ng-template [ngIf]="sentByCurrentUser$ | async | not">
        <img
          class="mr-3 square-64 rounded-circle"
          src="{{message.author.avatarUrl}}">

        <div class="media-body">
          <p class="my-0 lead">{{message.content}}</p>
          <p class="my-0"><small class="text-muted"><em>Said by {{message.author.name}} {{message.timestamp | fromNow}}</em></small></p>
        </div>
      </ng-template>

      <ng-template [ngIf]="sentByCurrentUser$ | async">
        <div class="media-body text-right">
          <p class="my-0 lead">{{message.content}}</p>
          <p class="my-0"><small class="text-muted"><em>Said by {{message.author.name}} {{message.timestamp | fromNow}}</em></small></p>
        </div>

        <img
          class="d-flex ml-3 square-64 rounded-circle"
          src="{{message.author.avatarUrl || '/assets/unknown-user.jpg'}}">
      </ng-template>
    </div>
  `
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  private sentByCurrentUser$: Observable<boolean>;

  constructor(
    @Inject(AuthService) private authService: AuthService
  ) {}

  ngOnInit() {
    this.sentByCurrentUser$ = this.authService.user$.map(user => user.uid === this.message.author);
  }


}

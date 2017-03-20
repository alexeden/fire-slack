import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { ChannelService, MessageService } from 'app/services';
import { Channel, Message } from 'app/interfaces';
import { tag$ } from 'util/tags';




@Component({
  selector: 'channel-window',
  template: `
  <div class="container-fluid">
    <h3 class="display-4">{{channelName$ | async}}</h3>
    <p class="lead">Some bio info</p>

    <ul class="list-group">
      <div class="list-group-item media" *ngIf="noMessagesYet$ | async">
        <div class="media-body">
        <p class="m-y-0 lead">No messages yet!</p>           
        </div>
      </div>
      <div class="list-group-item media" *ngFor="let message of channelMessages$ | async">
        <div class="media">
          <div *ngIf="incoming" class="media-left media-bottom">
            <img class="media-object square-64 img-circle" src="{{message.author.avatarSrc}}">
          </div>
          <div class="media-body">
            <p class="m-y-0 lead">{{message.content}}</p>
            <p class="m-y-0"><small class="text-muted"><em>Said by {{message.author.name}} {{message.timestamp | fromNow}}</em></small></p>
          </div>
          <div *ngIf="!incoming" class="media-left media-bottom">
            <img class="media-object square-64 img-circle" src="{{message.author.avatarSrc}}">
          </div>
        </div>
      </div>
    </ul>

    <input
      type="text"
      class="m-t-1 container-fluid form-control form-control-lg"
      placeholder="Say something"
      (keydown.enter)="sendMessage($event.target)"/>
  </div>
  `
})
export class ChannelWindowComponent {

  private channel$: Observable<Channel>;
  private channelName$: Observable<string>;
  private channelMessages$: Observable<Message[]>;
  private noMessagesYet$: Observable<boolean>;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(MessageService) private messageService: MessageService
  ) {
    this.channel$ = channelService.activeChannel$;
    this.channelName$ = this.channel$.map(channel => channel.name);
    this.channelMessages$ = this.channel$.map(channel => channel.messages).do(tag$('messages'));
    this.noMessagesYet$ = this.channelMessages$.map(msgs => msgs.length < 1);
  }

  sendMessage(input: HTMLInputElement) {
    this.channel$
      .take(1)
      .do(channel =>
        this.messageService.createMessage({
          content: input.value,
          channel
        })
      )
      .subscribe(_ => input.value = '');


  }
}

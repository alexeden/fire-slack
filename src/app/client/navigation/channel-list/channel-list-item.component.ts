import { Observable } from 'rxjs';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ChannelService, MessageService } from 'fire-slack/app/services';
import { Channel } from 'fire-slack/app/interfaces';
import { tag$ } from 'util/tags';


@Component({
  selector: 'channel-list-item',
  templateUrl: './channel-list-item.html'
})
export class ChannelListItemComponent implements OnInit {
  @Input() channel: Channel;
  // private isActive$: Observable<boolean>;
  private unseenMessageCount$: Observable<number>;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(MessageService) private messageService: MessageService
  ) {}

  ngOnInit() {
    // this.isActive$ = this.channelService.activeChannel$.map(channel => channel.cid === this.channel.cid);
    this.unseenMessageCount$ = Observable.of(0);
    // this.messageService.unseenMessagesForChannelId(this.channel.cid).map(msgs => msgs.length);

    /* When this channel becomes active, mark all of its messages as seen */
    // this.isActive$
    //   .filter(isActive => isActive === true)
    //   .distinctUntilChanged()
    //   .subscribe(_ => {
    //     // this.messageService.markMessagesAsSeenForChannelId(this.channel.cid)
    //   });
  }

  // setActiveChannel(channel: Channel) {
  //   this.channelService.setActiveChannel(channel);
  // }

}

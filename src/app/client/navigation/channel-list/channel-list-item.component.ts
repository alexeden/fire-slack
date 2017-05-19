import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Channel } from 'fire-slack/app/interfaces';

@Component({
  selector: 'channel-list-item',
  templateUrl: './channel-list-item.html'
})
export class ChannelListItemComponent implements OnInit {
  @Input() channel: Channel;
  private unseenMessageCount$: Observable<number>;


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

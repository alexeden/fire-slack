import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChannelService } from 'fire-slack/app/services';
import { Channel } from 'fire-slack/app/interfaces';
import { tag$ } from 'fire-slack/util';


@Component({
  selector: 'channel-list',
  template: `
    <ul class="list-group">
      <channel-list-item
        *ngFor="let channel of channels$ | async"
        (click)="gotoChannel(channel)"
        [channel]="channel">
      </channel-list-item>
    </ul>
    <div class="mt-auto">
    <button (click)="openRelativeChannelCreationOverlay()" type="button" class="btn btn-primary">+ Relative</button>
    <button (click)="openChannelCreationOverlay()" type="button" class="btn btn-primary">+ Normal</button>
    </div>
  `
})
export class ChannelListComponent {
  private channels$: Observable<Channel[]>;

  constructor(
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router
  ) {
    this.channels$ = channelService.channels$;
  }

  openChannelCreationOverlay() {
    /*
      Tries going to URL:
      /channels/-KgrIYyMlTEWI4cVmlKT(overlay:create)
    */
    this.router.navigate(
      [{ outlets: { overlay: 'create' }}]
      // {
      //   relativeTo: this.route
      // }
    );
  }
  openRelativeChannelCreationOverlay() {
    /*
     Tries going to URL:
     /channels/(-KgrIYyMlTEWI4cVmlKT//overlay:create)
   */
    this.router.navigate(
      [{ outlets: { overlay: 'create' }}],
      {
        relativeTo: this.route
      }
    );
  }

  gotoChannel(channel: Channel) {
    console.log('gotoChannel: ', channel);
    this.router.navigate(
      [channel.cid],
      {
        relativeTo: this.route
      }
    );
  }
}

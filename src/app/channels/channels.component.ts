import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChannelService } from 'fire-slack/app/services';
import { Channel } from 'fire-slack/app/interfaces';
import { tag$ } from 'fire-slack/util';


@Component({
  template: `
    <router-outlet name="overlay"></router-outlet>
    <div class="row mx-0">
      <div class="col-md-4 col-lg-4 col-xl-3 mx-0 px-0 z-depth-1" style="z-index: 10; background-color: #ffffff;">
        <ul class="list-group">
          <channel-list-item
            *ngFor="let channel of channels$ | async"
            (click)="gotoChannel(channel)"
            [channel]="channel">
          </channel-list-item>
        </ul>
      </div>
      <div class="col-md-8 col-lg-8 col-xl-9 px-0 mx-0">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
  // <div class="mt-auto">
  //   <button (click)="openRelativeChannelCreationOverlay()" type="button" class="btn btn-primary">+ Relative</button>
  //   <button (click)="openChannelCreationOverlay()" type="button" class="btn btn-primary">+ Normal</button>
  //   <pre>{{route.params | async | json}}</pre>
  // </div>
})
export class ChannelsComponent {
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

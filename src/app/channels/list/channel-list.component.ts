import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChannelService } from 'fire-slack/app/services';
import { Channel } from 'fire-slack/app/interfaces';
import { tag$ } from 'fire-slack/util';




@Component({
  selector: 'channel-list',
  template: `
    <div class="row mx-0">
      <div class="col-md-4 col-lg-4 col-xl-3 mx-0 px-0" style="z-index: 10; background-color: #ffffff; box-shadow: 1px 0 3px rgba(0,0,0,0.06), 1px 0 2px rgba(0,0,0,0.12);">
        <ul class="list-group">
          <channel-list-item
            *ngFor="let channel of channels$ | async"
            (click)="gotoChannel(channel)"
            [channel]="channel">
          </channel-list-item>
        </ul>
        <div class="mt-auto">
          <button [routerLink]="[{outlets: {overlay: 'create-channel'}}]" type="button" class="btn btn-primary">+</button>
        </div>
      </div>
      <div class="col-md-8 col-lg-8 col-xl-9 px-0 mx-0">
        <router-outlet></router-outlet>
      </div>
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

  gotoChannel(channel: Channel) {
    console.log('gotoChannel: ', channel);
    this.router.navigate([channel.cid], {
      relativeTo: this.route
    });
  }
}

import { Component, Inject, AfterViewInit } from '@angular/core';
import { MediaQueryService } from 'fire-slack/shared';


@Component({
  template: `
    <div
      class="row mx-0 d-flex flex-row align-items-stretch"
      style="min-height:100%">

      <side-nav class="col-3" #sideNav>
        <channel-list></channel-list>
        <button class="btn btn-primary" (click)="overlay.open()">Create a channel</button>
      </side-nav>

      <div class="col px-0 mx-0">

        <div class="container-fluid top-nav">
          <button
            class="btn btn-primary open-side-nav-trigger"
            *ngIf="mq.smDown$ | async"
            (click)="sideNav.toggleState()">
            > {{sideNav.sideNavState$ | async}}
          </button>

        </div>

        <router-outlet></router-outlet>
      </div>
    </div>
    <overlay-wrapper #overlay>
      <create-channel-overlay></create-channel-overlay>
    </overlay-wrapper>
  `
})
export class ClientWrapperComponent implements AfterViewInit {

  constructor(
    @Inject(MediaQueryService) public mq: MediaQueryService
  ) {
    //
  }

  ngAfterViewInit() {
    //
  }
}

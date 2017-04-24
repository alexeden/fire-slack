import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';

const animateSideNav: AnimationTriggerMetadata =
  trigger('sideNav', [
    state('inactive', style({
      maxWidth: '0'
    })),
    state('active', style({
      maxWidth: '100%'
    })),
    transition('inactive => active', animate('333ms ease-in')),
    transition('active => inactive', animate('333ms ease-out'))
  ]);

@Component({
  template: `
    <div class="row mx-0 d-flex flex-row align-items-stretch" style="min-height:100%">
      <div class="side-nav hidden-sm-down col-md-4 col-xl-3 mx-0 px-0 z-depth-1">
        <channel-list></channel-list>
        <button class="btn btn-primary" (click)="overlay.open()">Create a channel</button>
        <overlay-wrapper #overlay>
          <create-channel-overlay></create-channel-overlay>
        </overlay-wrapper>
      </div>

      <div class="col-md-8 col-xl-9 px-0 mx-0">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  animations: [
    animateSideNav
  ],
  styles: [`
    .side-nav {
      overflow: hidden;
      z-index: 10;
      background-color: #ffffff;
    }
  `]
})
export class ClientWrapperComponent {
  sideNavState = 'active';

  setSideNavState(state: string) {
    this.sideNavState = this.sideNavState === 'inactive' ? 'active' : 'inactive';
  }
}

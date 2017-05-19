import { BehaviorSubject, ConnectableObservable, Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';
import { MediaQueryService } from 'fire-slack/shared/services';

const Hidden = 'hidden';
const Visible = 'visible';
const SlideOver = 'fixed';
type SideNavState = typeof Hidden | typeof Visible | typeof SlideOver;

/*
  state('stateName', style({
    This is the style that will be applied
    at the END of the transition to this state
  }))

  - Transitions specify the timing between 2 states
  - Styles applied inside transition() are not kept!
  - Only styles defined inside state() are permanent
*/


const animateSideNavOverlay: AnimationTriggerMetadata =
  trigger('sideNavOverlay', [
    state('*', style({ opacity: 0.5 })),
    transition(`:leave`, [
      animate('.333s ease-in-out', style({ opacity: 0 }))
    ]),
    transition(':enter', [
      style({ opacity: 0}),
      animate('.333s ease-in-out')
    ])
  ]);


@Component({
  selector: 'side-nav',
  template: `
    <div
      class="side-nav"
      [ngClass]="{'slide-over': !(sideNavHidden$ | async) && (mq.smDown$ | async), 'col-xs-4': (mq.md$ | async), 'col-xs-3': (mq.lgUp$ | async)}">
      <ng-content></ng-content>
    </div>
    <div
      class="side-nav-overlay"
      (click)="close()"
      *ngIf="!(sideNavHidden$ | async) && (mq.smDown$ | async)"
      [@sideNavOverlay]>
    </div>

  `,
  animations: [ animateSideNavOverlay ],
  styleUrls: [ './side-nav.component.scss' ]

})
export class SideNavComponent {
  sideNavState$ = new BehaviorSubject<SideNavState>(Hidden);
  sideNavHidden$: Observable<boolean>;
  sideNavVisible$: Observable<boolean>;

  constructor(
    @Inject(MediaQueryService) public mq: MediaQueryService
  ) {

  }

  close() {
    this.sideNavState$.next(Hidden);
  }

  toggleState() {
    this.sideNavState$
      .take(1)
      .map(sideNavState => sideNavState === Hidden ? SlideOver : Hidden)
      .subscribe(sideNavState => this.sideNavState$.next(sideNavState));
  }
}

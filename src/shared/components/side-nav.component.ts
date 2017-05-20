import { BehaviorSubject, Observable } from 'rxjs';
import { Component, Inject, Input } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';
import { MediaQueryService } from 'fire-slack/shared/services';

type SideNavState = 'closed' | 'embedded' | 'slide-over';
const Closed: SideNavState = 'closed';
const Embedded: SideNavState = 'embedded';
const SlideOver: SideNavState = 'slide-over';

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
      [ngClass]="sideNavClassExpr$ | async">
      <ng-content></ng-content>
    </div>
    <div
      class="side-nav-overlay"
      (click)="close()"
      *ngIf="showSideNavOverlayBg$ | async"
      [@sideNavOverlay]>
    </div>

  `,
  animations: [ animateSideNavOverlay ],
  styleUrls: [ './side-nav.component.scss' ]

})
export class SideNavComponent {

  @Input() embeddedModeClasses: string[] = [];

  sideNavState$ = new BehaviorSubject<SideNavState>(Closed);
  sideNavHidden$: Observable<boolean>;
  showSideNavOverlayBg$: Observable<boolean>;
  sideNavVisible$: Observable<boolean>;

  sideNavClassExpr$: Observable<{[cssClass: string]: boolean}>;

  constructor(
    @Inject(MediaQueryService) public mq: MediaQueryService
  ) {
    this.sideNavHidden$ = this.sideNavState$.map(sideNavState => sideNavState === Closed);
    this.sideNavVisible$ = this.sideNavState$.map(sideNavState => sideNavState === Embedded);

    this.showSideNavOverlayBg$
      = Observable.combineLatest(
          this.sideNavState$,
          this.mq.smDown$,
          (sideNavState, smDown) => sideNavState !== Closed && smDown
        );

    this.sideNavClassExpr$
      = Observable.combineLatest(
          this.sideNavHidden$,
          this.mq.smDown$,
          (sideNavHidden, smDown) => !sideNavHidden && smDown
        )
        .map(slideOverMode => (
            {
              [SlideOver]: slideOverMode,
              ...(this.embeddedModeClasses.reduce(
                (classExpr, cssClass) => (
                  {
                    ...classExpr,
                    [cssClass]: !slideOverMode
                  }
                ),
                {}
              ))
            }
          )
        )
        .do(classExpr => console.log(JSON.stringify(classExpr, null, 4)));


  }

  close() {
    this.sideNavState$.next(Closed);
  }

  toggleState() {
    this.sideNavState$
      .take(1)
      .map(sideNavState => sideNavState === Closed ? SlideOver : Closed)
      .subscribe(sideNavState => this.sideNavState$.next(sideNavState));
  }
}

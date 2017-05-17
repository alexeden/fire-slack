import { Component, Renderer2, ElementRef, Inject, ViewContainerRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';
import { BehaviorSubject, ConnectableObservable, Observable } from 'rxjs';

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
  template: `
    <div
      class="row mx-0 d-flex flex-row align-items-stretch"
      style="min-height:100%">
      <div
        class="side-nav"
        [ngClass]="{'slide-over': !(sideNavHidden$ | async) && (smDown$ | async), 'col-xs-4': (md$ | async), 'col-xs-3': (lgUp$ | async)}">

        <channel-list></channel-list>
        <button class="btn btn-primary" (click)="toggleState()">Toggle side-nav</button>
        <button class="btn btn-primary" (click)="overlay.open()">Create a channel</button>
      </div>
      <div
        class="side-nav-overlay"
        (click)="closeSideNav()"
        *ngIf="!(sideNavHidden$ | async) && (smDown$ | async)"
        [@sideNavOverlay]>
      </div>

      <div class="col px-0 mx-0">

        <div class="container-fluid top-nav">
          <button
            class="btn btn-primary open-side-nav-trigger"
            *ngIf="smDown$ | async"
            (click)="toggleState()">
            >
          </button>

        </div>

        <router-outlet></router-outlet>
      </div>
    </div>
    <overlay-wrapper #overlay>
      <create-channel-overlay></create-channel-overlay>
    </overlay-wrapper>
  `,
  animations: [ animateSideNavOverlay ],
  styleUrls: [ './client-wrapper.component.scss' ]
})
export class ClientWrapperComponent implements AfterViewInit {
  sideNavState$ = new BehaviorSubject<SideNavState>(Hidden);
  sideNavHidden$: Observable<boolean>;
  sideNavVisible$: Observable<boolean>;

  windowWidth$: ConnectableObservable<number>;
  xsUp$: Observable<boolean>;
  smUp$: Observable<boolean>;
  mdUp$: Observable<boolean>;
  lgUp$: Observable<boolean>;
  xlUp$: Observable<boolean>;
  xs$: Observable<boolean>;
  sm$: Observable<boolean>;
  md$: Observable<boolean>;
  lg$: Observable<boolean>;
  xl$: Observable<boolean>;
  xsDown$: Observable<boolean>;
  smDown$: Observable<boolean>;
  mdDown$: Observable<boolean>;
  lgDown$: Observable<boolean>;
  xlDown$: Observable<boolean>;

  constructor(
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(ElementRef) private el: ElementRef,
    @Inject(ViewContainerRef) private view: ViewContainerRef
  ) {

    this.windowWidth$
      = Observable.fromEvent(window, 'resize')
          .map(_ => window.innerWidth)
          .startWith(window.innerWidth)
          .distinctUntilChanged()
          .publishReplay(1);

    this.xsUp$ = this.windowWidth$.map(width => width > 0);
    this.smUp$ = this.windowWidth$.map(width => width > 576);
    this.mdUp$ = this.windowWidth$.map(width => width > 768);
    this.lgUp$ = this.windowWidth$.map(width => width > 992);
    this.xlUp$ = this.windowWidth$.map(width => width > 1200);

    this.xsDown$ = this.windowWidth$.map(width => width < 576);
    this.smDown$ = this.windowWidth$.map(width => width < 768);
    this.mdDown$ = this.windowWidth$.map(width => width < 992);
    this.lgDown$ = this.windowWidth$.map(width => width < 1200);
    this.xlDown$ = this.windowWidth$.map(width => true);

    this.xs$ = Observable.combineLatest(this.xsUp$, this.xsDown$, (up, down) => up && down);
    this.sm$ = Observable.combineLatest(this.smUp$, this.smDown$, (up, down) => up && down);
    this.md$ = Observable.combineLatest(this.mdUp$, this.mdDown$, (up, down) => up && down);
    this.lg$ = Observable.combineLatest(this.lgUp$, this.lgDown$, (up, down) => up && down);
    this.xl$ = Observable.combineLatest(this.xlUp$, this.xlDown$, (up, down) => up && down);

    window['renderer'] = this.renderer;
    window['el'] = this.el.nativeElement;
    window['view'] = this.view;

    this.sideNavHidden$ = this.sideNavState$.map(sideNavState => sideNavState === Hidden);
    this.sideNavVisible$ = this.sideNavState$.map(sideNavState => sideNavState === Visible);


  }

  ngAfterViewInit() {
    this.windowWidth$.connect();
    //
  }

  closeSideNav() {
    this.sideNavState$.next(Hidden);
  }

  toggleState() {
    this.sideNavState$
      .take(1)
      .map(sideNavState => sideNavState === Hidden ? SlideOver : Hidden)
      .subscribe(sideNavState => this.sideNavState$.next(sideNavState));
  }
}

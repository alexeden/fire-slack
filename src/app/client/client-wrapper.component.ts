import { Component, Renderer2, ElementRef, Inject, ViewContainerRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';
import { BehaviorSubject, Observable } from 'rxjs';

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
    state('*', style({
      opacity: 0.5
    })),
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
        [ngClass]="{'slide-over': !(sideNavHidden$ | async)}"
        class="side-nav col-md-4">
        <channel-list></channel-list>
        <button class="btn btn-primary" (click)="toggleState()">Toggle side-nav</button>
        <button class="btn btn-primary" (click)="overlay.open()">Create a channel</button>
        <overlay-wrapper #overlay>
          <create-channel-overlay></create-channel-overlay>
        </overlay-wrapper>
      </div>
      <div
        class="side-nav-overlay"
        (click)="closeSideNav()"
        *ngIf="!(sideNavHidden$ | async)"
        [@sideNavOverlay]>
      </div>

      <div class="col px-0 mx-0">

        <div class="row top-nav">

          <button
            class="btn btn-primary open-side-nav-trigger"
            (click)="toggleState()">
            Toggle side-nav
          </button>

        </div>

        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  animations: [
    animateSideNavOverlay
  ],
  styleUrls: [ './client-wrapper.component.scss' ]
})
export class ClientWrapperComponent implements AfterViewInit {
  sideNavState$ = new BehaviorSubject<SideNavState>(Hidden);
  sideNavHidden$: Observable<boolean>;
  sideNavVisible$: Observable<boolean>;

  constructor(
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(ElementRef) private el: ElementRef,
    @Inject(ViewContainerRef) private view: ViewContainerRef
  ) {
    window['renderer'] = this.renderer;
    window['el'] = this.el.nativeElement;
    window['view'] = this.view;

    this.sideNavHidden$ = this.sideNavState$.map(sideNavState => sideNavState === Hidden);
    this.sideNavVisible$ = this.sideNavState$.map(sideNavState => sideNavState === Visible);


  }

  ngAfterViewInit() {
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

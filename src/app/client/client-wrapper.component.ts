import { Component, Renderer2, ElementRef, Inject, ViewContainerRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';

type SideNavState = 'hidden' | 'slideover' | 'embedded';

const animateSideNav: AnimationTriggerMetadata =
  trigger('sideNav', [
    state('hidden', style({
      maxWidth: '0'
    })),
    state('slideover', style({
      maxWidth: '100%'
    })),
    transition('slideover <=> hidden', animate('333ms ease-in-out'))
  ]);

const animateSideNavTrigger: AnimationTriggerMetadata =
  trigger('sideNavTrigger', [
    transition(':enter', [
      style({transform: 'translateX(-100%) scale(0)'}),
      animate(333)
    ]),
    transition(':leave', [
      animate(333, style({transform: 'translateX(-100%) scale(1)'}))
    ])
  ]);

@Component({
  template: `
    <div
      class="row mx-0 d-flex flex-row align-items-stretch"
      style="min-height:100%">
      <div
        [@sideNav]="sideNavState"
        class="side-nav fixed hidden-sm-down col-md-4 col-xl-3 mx-0 px-0 z-depth-1">
        <channel-list></channel-list>
        <button class="btn btn-primary" (click)="toggleState()">Toggle side-nav</button>
        <button class="btn btn-primary" (click)="overlay.open()">Create a channel</button>
        <overlay-wrapper #overlay>
          <create-channel-overlay></create-channel-overlay>
        </overlay-wrapper>
      </div>

      <div class="col px-0 mx-0">
        <button
          *ngIf="sideNavHidden"
          [@sideNavTrigger]
          class="btn btn-primary"
          (click)="toggleState()">
          Toggle side-nav
        </button>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  animations: [
    animateSideNavTrigger,
    animateSideNav
  ],
  styleUrls: [ './client-wrapper.component.scss' ]
})
export class ClientWrapperComponent implements AfterViewInit {
  sideNavState: SideNavState = 'slideover';

  constructor(
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(ElementRef) private el: ElementRef,
    @Inject(ViewContainerRef) private view: ViewContainerRef
  ) {
    window['renderer'] = this.renderer;
    window['el'] = this.el.nativeElement;
    window['view'] = this.view;


  }

  ngAfterViewInit() {
    // console.log(this.renderer.selectRootElement('div'));
  }

  toggleState() {
    this.sideNavState = this.sideNavState === 'hidden' ? 'slideover' : 'hidden';
  }
  get sideNavHidden() {
    return this.sideNavState === 'hidden';
  }
  setSideNavState(state: string) {
    this.sideNavState = this.sideNavState === 'hidden' ? 'slideover' : 'hidden';
  }
}

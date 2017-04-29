import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'overlay-wrapper',
  template: `
    <div class="overlay-wrapper">
      <div
        (@overlay.done)="activating($event)"
        [@overlay]="overlayState"
        class="overlay z-depth-2">
        <div class="overlay__content" *ngIf="showOverlayComponent">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['overlay-wrapper.component.scss'],
  animations: [
    trigger('overlay', [
      state('inactive', style({
        height: 0,
        width: 0,
        opacity: 0.9
      })),
      state('active', style({
        width: '200vw',
        height: '200vh',
        opacity: 1
      })),
      transition('inactive => active', animate('0.2s ease-in')),
      transition('active => inactive', animate('0.2s ease-out'))
    ])
  ]
})
export class OverlayWrapperComponent {
  overlayState = 'inactive';
  private showOverlayComponent = false;

  constructor() {
    console.log('overlay wrapper this: ', this);

  }
  activating(event: AnimationEvent) {
    console.log('activating event: ', event);
    if(event.toState === 'active') {
      this.showOverlayComponent = true;
    }
    else if(event.toState === 'inactive' || event.toState === 'void') {
      this.showOverlayComponent = false;
    }
  }
  open() {
    console.log('open!');
    this.overlayState = 'active';
  }
  close() {
    console.log('close!');
    this.overlayState = 'inactive';
  }

}

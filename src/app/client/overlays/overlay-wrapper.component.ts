import { Component, ContentChild, Type } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationEvent } from '@angular/animations';
import { Overlay } from './overlay';



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
  styles: [`
    .overlay-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 0;
      top: 0;
      left: 0;
      pointer-events: none;
    }
    .overlay-wrapper .overlay {
      align-items: center;
      backface-visibility: hidden;
      background: #ffffff;
      border-radius: 50%;
      display: flex;
      flex: none;
      justify-content: center;
      pointer-events: all;
      z-index: 999;
    }
    .overlay-wrapper .overlay .overlay__content {
      backface-visibility: hidden;
    }
  `],
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

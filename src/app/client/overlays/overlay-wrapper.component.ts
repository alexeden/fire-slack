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
        <div class="overlay__content">
          <ng-template [ngIf]="showOverlayComponent">
            <ng-content></ng-content>
          </ng-template>
        </div>
    </div>
  `,
  styles: [`
    .overlay-wrapper {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: -1;
      top: 0;
      left: 0;
      pointer-events: none;
    }
    .overlay-wrapper .overlay {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      background: #ffffff;
      backface-visibility: hidden;
    }
    .overlay-wrapper .overlay .overlay__content {
      transition: opacity .4s ease;
      backface-visibility: hidden;
      max-width: 90vw;
      max-height: 90vh;
    }
  `],
  animations: [
    trigger('overlay', [
      state('inactive', style({
        height: 0,
        width: 0
      })),
      state('active', style({
        width: '200vw',
        height: '200vw'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
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
    if(event.toState === 'active') {
      this.showOverlayComponent = true;
      console.log('activating: ', event);
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
    console.log('open!');
    this.overlayState = 'inactive';
  }

}

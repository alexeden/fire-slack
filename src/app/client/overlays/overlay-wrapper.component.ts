import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'overlay-wrapper',
  template: `
    <ng-template [ngIf]="showOverlayComponent">
      <div
        [@overlayBackground]="true"
        class="overlay-background"></div>
      <div
        [@overlayContent]="true"
        class="overlay-wrapper">
        <div class="overlay">
          <ng-content></ng-content>
        </div>
      </div>
    </ng-template>
  `,
  styleUrls: ['overlay-wrapper.component.scss'],
  animations: [

    trigger('overlayContent', [
      state('*', style({})),
      transition(`:leave`, [
        animate('.4s ease-in-out', style({ opacity: 0 }))
      ]),
      transition(`:enter`, [
        style({ opacity: 0 }),
        animate('.2s .3s ease-in-out')
      ])
    ]),

    trigger('overlayBackground', [
      state('*', style({})),
      transition(`:leave`, [
        animate('.4s .2s ease', style({ height: 0, width: 0 }))
      ]),
      transition(':enter', [
        style({ height: 0, width: 0 }),
        animate('.4s cubic-bezier(0.895, 0.03, 0.685, 0.22)')
      ])
    ])
  ]
})
export class OverlayWrapperComponent {
  overlayState = 'inactive';
  showOverlayComponent = false;

  open() {
    this.showOverlayComponent = true;
  }
  close() {
    this.showOverlayComponent = false;
  }

}

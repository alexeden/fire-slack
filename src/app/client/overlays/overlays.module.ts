import { NgModule } from '@angular/core';
import { SharedModule } from 'fire-slack/shared';

import { CreateChannelOverlayComponent } from './create-channel.component';
import { OverlayWrapperComponent } from './overlay-wrapper.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CreateChannelOverlayComponent,
    OverlayWrapperComponent
  ],
  exports: [
    CreateChannelOverlayComponent,
    OverlayWrapperComponent
  ]
})
export class FireSlackClientOverlaysModule {}

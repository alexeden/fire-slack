import { NgModule } from '@angular/core';
import { SharedModule } from 'fire-slack/shared';

import { FireSlackClientRoutingModule } from './client-routing.module';
import { FireSlackClientNavigationModule } from './navigation';
import { FireSlackClientMainModule } from './main';
import { FireSlackClientScopesModule } from './scopes';
import { ClientWrapperComponent } from './client-wrapper.component';
import { CreateChannelOverlayComponent } from './overlays/create-channel.component';

@NgModule({
  imports: [
    FireSlackClientRoutingModule,
    FireSlackClientMainModule,
    FireSlackClientNavigationModule,
    FireSlackClientScopesModule,
    SharedModule
  ],
  declarations: [
    ClientWrapperComponent,
    CreateChannelOverlayComponent
  ],
  exports: [
    ClientWrapperComponent
  ]
})
export class FireSlackClientModule {}
export * from './client-wrapper.component';

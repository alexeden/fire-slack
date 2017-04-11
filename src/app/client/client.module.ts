import { NgModule } from '@angular/core';
import { SharedModule } from 'fire-slack/shared';

import { FireSlackClientRoutingModule } from './client-routing.module';
import { FireSlackClientNavigationModule } from './navigation';
import { FireSlackClientMainModule } from './main';
import { FireSlackClientScopesModule } from './scopes';
import { FireSlackClientOverlaysModule } from './overlays';
import { ClientWrapperComponent } from './client-wrapper.component';

@NgModule({
  imports: [
    FireSlackClientRoutingModule,
    FireSlackClientMainModule,
    FireSlackClientNavigationModule,
    FireSlackClientScopesModule,
    FireSlackClientOverlaysModule,
    SharedModule
  ],
  declarations: [
    ClientWrapperComponent
  ],
  exports: [
    ClientWrapperComponent
  ]
})
export class FireSlackClientModule {}
export * from './client-wrapper.component';

import { NgModule } from '@angular/core';
import { SharedModule } from 'fire-slack/shared';

import { UserScopeDirective } from './user-scope.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [
    UserScopeDirective
  ],
  exports: [
    UserScopeDirective
  ]
})
export class FireSlackClientScopesModule {}

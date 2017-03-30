import { NgModule } from '@angular/core';
import { SharedModule } from 'fire-slack/shared';

import { NavBarComponent } from './nav-bar.component';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NavBarComponent,
    LoginComponent
  ],
  exports: [
    NavBarComponent,
    LoginComponent
  ]
})
export class FireSlackLayoutModule {}
export * from './nav-bar.component';
export * from './login.component';

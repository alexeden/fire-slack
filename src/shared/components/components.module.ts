import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedServicesModule } from 'fire-slack/shared/services';
import { SideNavComponent } from './side-nav.component';


@NgModule({
  imports: [
    CommonModule,
    SharedServicesModule
  ],
  declarations: [
    SideNavComponent
  ],
  exports: [
    SideNavComponent
  ]
})
export class SharedComponentsModule {}
export * from './side-nav.component';

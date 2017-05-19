import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from './components';
import { SharedPipesModule } from './pipes';
import { SharedServicesModule } from './services';

@NgModule({
  exports: [
    SharedComponentsModule,
    SharedPipesModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedServicesModule
  ]
})
export class SharedModule {}
export * from './components';
export * from './pipes';
export * from './services';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedPipesModule } from './pipes';

@NgModule({
  exports: [
    SharedPipesModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule {}
export * from './pipes';

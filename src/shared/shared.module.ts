import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedPipesModule } from './pipes';

@NgModule({
  exports: [
    SharedPipesModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
export * from './pipes';

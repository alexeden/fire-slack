import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPipesModule } from './pipes';

@NgModule({
  exports: [
    SharedPipesModule,
    CommonModule
  ]
})
export class SharedModule {}
export * from './pipes';

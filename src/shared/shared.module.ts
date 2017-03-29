import { NgModule } from '@angular/core';
import { SharedPipesModule } from './pipes';

@NgModule({
  exports: [
    SharedPipesModule
  ]
})
export class SharedModule {}
export * from './pipes';

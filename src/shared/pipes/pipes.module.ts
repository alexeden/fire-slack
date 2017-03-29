import { NgModule } from '@angular/core';
import { FromNowPipe } from './from-now.pipe';
import { NotPipe } from './not.pipe';

@NgModule({
  declarations: [
    FromNowPipe,
    NotPipe
  ],
  exports: [
    FromNowPipe,
    NotPipe
  ]
})
export class SharedPipesModule {}
export { FromNowPipe } from './from-now.pipe';
export { NotPipe } from './not.pipe';

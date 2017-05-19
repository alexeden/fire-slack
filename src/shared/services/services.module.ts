import { NgModule } from '@angular/core';

import { MediaQueryService } from './media-query.service';

@NgModule({
  providers: [
    MediaQueryService
  ]
})
export class SharedServicesModule {}
export { MediaQueryService } from './media-query.service';

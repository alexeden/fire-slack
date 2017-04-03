import { NgModule, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SharedModule } from 'fire-slack/shared';
import { FireSlackRouterModule } from './router';
import { FireSlackLayoutModule } from './layout';
import { FireSlackServicesModule } from './services';
import { FireSlackChannelsModule } from './channels';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    FireSlackServicesModule,
    FireSlackLayoutModule,
    FireSlackChannelsModule,
    FireSlackRouterModule // must be last!
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(@Inject(Router) private router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}

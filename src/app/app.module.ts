import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'fire-slack/shared';
import { FireSlackRouterModule } from './router';
import { FireSlackLayoutModule } from './layout';
import { FireSlackServicesModule } from './services';
import { FireSlackClientModule } from './client';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    FireSlackServicesModule,
    FireSlackLayoutModule,
    FireSlackClientModule,
    FireSlackRouterModule // must be last!
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

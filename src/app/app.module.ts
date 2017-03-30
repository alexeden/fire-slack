import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'fire-slack/shared';
import { FireSlackRouterModule } from './router';
import { FireSlackLayoutModule } from './layout';
import { FireSlackServicesModule } from './services';
import { FireSlackChannelsModule } from './channels';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FireSlackRouterModule,
    FireSlackServicesModule,
    FireSlackLayoutModule,
    FireSlackChannelsModule,
    SharedModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

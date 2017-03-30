import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FireSlackRouterModule } from './router';
import { FireSlackLayoutModule } from './layout';
import { SharedModule } from '../shared';

import { AppComponent } from './app.component';
import { FireSlackServicesModule } from 'fire-slack/app/services';
import { NavBarComponent } from './nav-bar';
import { ChannelListComponent, ChannelListItemComponent } from './channel-list';
import { ChannelWindowComponent, ChannelMessageComponent } from './channel-display';

// import { FireSlackDataFactoryProvider } from './data.provider';

@NgModule({
  imports: [
    BrowserModule,
    FireSlackRouterModule,
    FireSlackServicesModule,
    FireSlackLayoutModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    ChannelListComponent,
    ChannelListItemComponent,
    ChannelWindowComponent,
    ChannelMessageComponent
  ],
  // providers: [
  //   FireSlackDataFactoryProvider
  // ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

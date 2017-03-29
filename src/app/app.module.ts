import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared';

import { AppComponent } from './app.component';
import { FireSlackServicesModule } from 'app/services';
import { NavBarComponent } from './nav-bar';
import { ChannelListComponent, ChannelListItemComponent } from './channel-list';
import { ChannelWindowComponent, ChannelMessageComponent } from './channel-display';

import { FireSlackDataFactoryProvider } from './data.provider';

@NgModule({
  imports: [
    BrowserModule,
    FireSlackServicesModule,
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
  providers: [
    FireSlackDataFactoryProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

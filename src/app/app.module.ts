import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RxChatServicesModule } from 'app/services';
import { NavBarComponent } from './nav-bar';
import { ChannelListComponent, ChannelListItemComponent } from './channel-list';
import { ChannelWindowComponent, ChannelMessageComponent } from './channel-display';
import { FromNowPipe } from './from-now.pipe';
import { NotPipe } from './not.pipe';

import { RxChatDataFactoryProvider } from './data.provider';

@NgModule({
  imports: [
    BrowserModule,
    RxChatServicesModule
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    ChannelListComponent,
    ChannelListItemComponent,
    ChannelWindowComponent,
    ChannelMessageComponent,
    FromNowPipe,
    NotPipe
  ],
  providers: [
    RxChatDataFactoryProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

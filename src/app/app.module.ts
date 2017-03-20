import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RxChatServicesModule } from 'app/services';
import { ChannelListComponent, ChannelListItemComponent } from './channel-list';
import { ChannelWindowComponent } from './channel-window.component';
import { FromNowPipe } from './from-now.pipe';

import { RxChatDataFactoryProvider } from './data.provider';

@NgModule({
  imports: [
    BrowserModule,
    RxChatServicesModule
  ],
  declarations: [
    AppComponent,
    ChannelListComponent,
    ChannelListItemComponent,
    ChannelWindowComponent,
    FromNowPipe
  ],
  providers: [
    RxChatDataFactoryProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

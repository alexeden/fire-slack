import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChannelService } from './channels.service';
import { UserService } from './user.service';
import { MessageService } from './messages.service';

import { dataProvider, RxChatData } from './data.provider';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    dataProvider,
    // {
    //   provide: RxChatData,
    //   deps: [UserService, ChannelService, MessageService],
    //   useFactory: dataFactory
    // },
    ChannelService,
    MessageService,
    UserService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

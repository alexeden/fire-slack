import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RxChatServicesModule } from 'app/services';
import { ChannelListComponent } from './channel-list.component';

// import { ChannelService } from './channels.service';
// import { UserService } from './user.service';
// import { MessageService } from './messages.service';
//
import { RxChatDataFactoryProvider } from './data.provider';

@NgModule({
  imports: [
    BrowserModule,
    RxChatServicesModule
  ],
  declarations: [
    AppComponent,
    ChannelListComponent
  ],
  providers: [
    RxChatDataFactoryProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

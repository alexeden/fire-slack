import { Component, Input } from '@angular/core';
import { Channel } from 'fire-slack/app/interfaces';


@Component({
  selector: 'channel-settings',
  template: `
    <div>
      Settings!
    </div>
  `
})
export class ChannelSettingsComponent {

  @Input() channel: Channel;

}

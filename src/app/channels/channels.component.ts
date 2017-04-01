import { Component } from '@angular/core';

@Component({
  template: `
    <router-outlet name="overlay"></router-outlet>
    <router-outlet></router-outlet>
  `
})
export class ChannelsComponent {}

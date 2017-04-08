import { Component } from '@angular/core';

@Component({
  template: `
    <router-outlet name="overlay"></router-outlet>
    <div class="row mx-0">
      <div class="col-md-4 col-lg-4 col-xl-3 mx-0 px-0 z-depth-1" style="z-index: 10; background-color: #ffffff;">
        <router-outlet name="navigation"></router-outlet>
      </div>
      <div class="col-md-8 col-lg-8 col-xl-9 px-0 mx-0">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class ClientWrapperComponent {}

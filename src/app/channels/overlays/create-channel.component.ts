import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  template: `
    <div tabindex="-1" role="dialog" style="z-index: 9999">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <button (click)="cancel()" type="button" class="btn btn-primary">Close</button>
          ...
        </div>
      </div>
    </div>
  `
})
export class CreateChannelOverlayComponent {
  constructor(
    @Inject(Router) private router: Router,
    @Inject(ActivatedRoute) private route: ActivatedRoute
  ) {}

  confirm() {
    this.close();
  }

  cancel() {
    this.close();
  }

  private close() {
    this.router.navigate(
      [{ outlets: { overlay: null } }],
      { relativeTo: this.route.parent }
    );
  }


}

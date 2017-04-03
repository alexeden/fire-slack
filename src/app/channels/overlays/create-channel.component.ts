import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService, ChannelService } from 'fire-slack/app/services';



@Component({
  template: `
    <div class="overlay-wrapper">
      <div class="overlay" tabindex="-1" role="dialog">
        <div class="container py-2" [formGroup]="newChannelForm">
          <div class="row form-group my-4">
            <div class="col-sm-12">
              <h2>Create a new channel</h2>
            </div>
          </div>
          <div class="form-group row">
            <label for="channelName" class="col-2 col-form-label">Give it a name</label>
            <div class="col-10">
              <input type="text" formControlName="name" class="form-control" id="channelName" placeholder="Name the channel">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2">Private channel?</label>
            <div class="col-sm-10">
              <div class="form-check">
                <label class="form-check-label">
                  <input class="form-check-input" type="checkbox" formControlName="private">
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="offset-sm-2 col-sm-10">
              <button (click)="cancel()" type="button" class="btn btn-primary">Close</button>
            </div>
          </div>
          <pre>{{newChannelForm.value | json}}</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overlay-wrapper{
      bottom: 0;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 11;
      background-color: rgba(0, 0, 0, 0.15);
    }
    .overlay {
      width: 100%;
      height: 400px;
      margin: 0;
      padding: 0;
      display: block;
      background-color: #ffffff;
      position: relative;
    }
  `]
})
export class CreateChannelOverlayComponent {

  private newChannelForm: FormGroup;

  constructor(
    @Inject(Router) private router: Router,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(FirebaseService) private firebase: FirebaseService,
    @Inject(ChannelService) private channelService: ChannelService
  ) {
    this.newChannelForm =
      fb.group({
        name: [null, Validators.required],
        private: [false]
      });
  }

  createChannel() {
    //
  }

  confirm() {
    this.close();
  }

  cancel() {
    this.close();
  }

  private close() {
    console.log('closing');
    this.router.navigate(
      [{ outlets: { overlay: null } }],
      { relativeTo: this.route.parent }
    );
  }


}

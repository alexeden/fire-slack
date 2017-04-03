import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { UserInfo } from 'fire-slack/app/interfaces';
import { FirebaseService, ChannelService, UserService, AuthService } from 'fire-slack/app/services';

@Component({
  templateUrl: './create-channel.component.html',
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
  private uid$: Observable<string>;
  private users$: Observable<UserInfo[]>;

  constructor(
    @Inject(Router) private router: Router,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(FirebaseService) private firebase: FirebaseService,
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(UserService) private userService: UserService
  ) {
    this.users$ = this.userService.users$;
    this.uid$ = this.authService.user$.map(user => user && user.uid);

    this.newChannelForm =
      fb.group({
        name: [null, Validators.required],
        private: [false],
        members: fb.group({
        })
      });

    this.users$
      .withLatestFrom(this.uid$)
      .subscribe(([users, uid]) =>
        users.map(user =>
          (this.newChannelForm.get('members') as FormGroup)
            .addControl(user.uid, new FormControl({
              value: user.uid === uid,
              disabled: user.uid === uid
            }))
        )
      );
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

import { Component, Inject, OnDestroy, OnInit, Host } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserInfo } from 'fire-slack/app/interfaces';
import { ChannelService, UserService } from 'fire-slack/app/services';
import { OverlayWrapperComponent } from './overlay-wrapper.component';

@Component({
  selector: 'create-channel-overlay',
  templateUrl: './create-channel.component.html'
})
export class CreateChannelOverlayComponent implements OnDestroy, OnInit {

  private newChannelForm: FormGroup;
  private uid$: Observable<string>;
  private users$: Observable<UserInfo[]>;

  confirm() {
    console.log('confirming the CreateChannelOverlayComponent via the abstract overlay open method');
    return Observable.of(true);
  }
  constructor(
    @Inject(Router) private router: Router,
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(ChannelService) private channelService: ChannelService,
    @Inject(UserService) private userService: UserService,
    @Host() @Inject(OverlayWrapperComponent) private overlayWrapper: OverlayWrapperComponent
  ) {
    console.log(this.overlayWrapper);
    this.users$ = this.userService.users$;
    this.uid$ = this.userService.currentUid$;

    this.newChannelForm =
      this.fb.group({
        name: [null, Validators.required],
        private: [false],
        members: this.fb.group({})
      });

    this.users$
      .withLatestFrom(this.uid$)
      .subscribe(([users, uid]) => {
        const membersGroup = this.newChannelForm.get('members') as FormGroup;
        users.map(user => {
          console.log(user.uid);
          const control = new FormControl(user.uid === uid);
          membersGroup.registerControl(user.uid, control);
          // if(user.uid === uid) control.disable();
        });
      });
  }

  ngOnInit() {
    console.log('init the channel creation form');
  }
  ngOnDestroy() {
    console.log('destroying the channel creation form');
  }

  createChannel() {
    this.channelService.createChannel(this.newChannelForm.value)
      .subscribe(
        (cid: string) => {
          console.log('navigating to channel id: ', cid);
          this.router.navigate(['/client', cid])
            .then(() => {
              console.log('done navigating, closing overlay');
              this.overlayWrapper.close();
            });
        },
        error => {
          console.log('channel creation failed with error: ', error);
        }
      );
  }

  cancel() {
    this.overlayWrapper.close();
  }

}

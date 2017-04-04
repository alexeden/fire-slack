import { Injectable, Inject } from '@angular/core';
import { ConnectableObservable, Observable } from 'rxjs';
import { UserInfo, Reference, DataSnapshot } from 'fire-slack/app/interfaces';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { tag$ } from 'fire-slack/util/tags';

type UserInfoOperation = (msg: UserInfo[]) => UserInfo[];


@Injectable()
export class UserService {
  private usersRef: Reference;

  currentUser$: ConnectableObservable<UserInfo>;
  currentUid$: Observable<string>;
  currentDisplayName$: Observable<string>;
  usersRef$: ConnectableObservable<DataSnapshot>;
  users$: Observable<UserInfo[]>;

  constructor(
    @Inject(FirebaseService) private firebaseService: FirebaseService,
    @Inject(AuthService) private authService: AuthService
  ) {
    this.currentUser$
      = this.authService.authState$
          .filter(user => user !== null)
          .publishReplay(1);

    this.currentUid$ = this.currentUser$.map(user => user.uid);
    this.currentDisplayName$ = this.currentUser$.map(user => user.displayName);

    this.usersRef = this.firebaseService.database.ref('users');
    this.usersRef$ = FirebaseService.observe(this.usersRef).publishReplay(1);

    this.users$ =
      this.usersRef$
        .map((data): {[uid: string]: UserInfo} => data.val() || {})
        .map(userObj => Object.keys(userObj).map(uid => userObj[uid]))
        .startWith([]);

    this.currentUser$.connect();
    this.usersRef$.connect();
  }


  private updateUserRecord(user: UserInfo) {
    const userInfoKeys = ['displayName', 'email', 'photoURL', 'providerId', 'uid'];
    const userInfo = userInfoKeys.reduce((info, k) => ({...info, [k]: user[k] || null}), {});

    Observable.fromPromise(
      this.usersRef.child(user.uid).set(userInfo) as Promise<void>
    )
    .subscribe();
  }

}

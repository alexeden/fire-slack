import { Injectable, Inject } from '@angular/core';
import { ConnectableObservable, Observable } from 'rxjs';
import { UserInfo, User, Reference, DataSnapshot } from 'fire-slack/app/interfaces';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { tag$ } from 'fire-slack/util/tags';

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
    this.usersRef = this.firebaseService.database.ref('users');
    this.usersRef$ = FirebaseService.observe(this.usersRef).publishReplay(1);

    this.currentUser$
      = this.authService.authState$
          .filter(user => user !== null)
          .distinctUntilKeyChanged('uid')
          .switchMap(user => this.updateUserRecord(user))
          .publishReplay(1);

    this.currentUid$ = this.currentUser$.map(user => user.uid);
    this.currentDisplayName$ = this.currentUser$.map(user => user.displayName);

    this.users$ =
      this.usersRef$
        .map((data): {[uid: string]: UserInfo} => data.val() || {})
        .map(userObj => Object.keys(userObj).map(uid => userObj[uid]))
        .startWith([]);

    this.currentUser$.connect();
    this.usersRef$.connect();
  }


  private updateUserRecord(user: User): Observable<UserInfo> {
    const providers: {[providerUid: string]: UserInfo}
      = user.providerData
          .filter(userInfo => userInfo !== null)
          .reduce(
            (providerObj, userInfo: UserInfo, i) => ({
              ...providerObj,
              [i]: userInfo
            }),
            {}
          );

    const userRecord = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName || (user.email && user.email.split('@')[0]) || 'Unknown',
      photoURL: user.photoURL || '/assets/unknown-user.jpg',
      providerId: providers[0] && providers[0].providerId,
      providers
    };

    return Observable.fromPromise(
      this.usersRef.child(user.uid).update(userRecord) as Promise<void>
    )
    .mapTo(userRecord as UserInfo);
  }

}

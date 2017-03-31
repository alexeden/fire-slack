import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, ConnectableObservable } from 'rxjs';
import * as Firebase from 'firebase';
import { tag$ } from 'fire-slack/util/tags';
import { UserInfo, Auth, DbReference, DataSnapshot } from 'fire-slack/app/interfaces';
import { FirebaseService } from './firebase.service';


@Injectable()
export class AuthService {

  private auth: Auth;
  private usersReference: DbReference;
  user$: ConnectableObservable<UserInfo>;
  isLoggedIn$: Observable<boolean>;
  loggedInNotifier$: Observable<UserInfo>;
  loggedOutNotifier$: Observable<UserInfo>;
  private authState$ = new Subject<UserInfo>();

  constructor(
    @Inject(FirebaseService) private firebase: FirebaseService
  ) {
    this.auth = this.firebase.app.auth();
    this.usersReference = this.firebase.database.ref('users');
    this.auth.onAuthStateChanged((authState: any) => this.authState$.next(authState));
    this.user$ = this.authState$.asObservable().publishReplay(1);

    this.user$.take(1).subscribe(this.updateUserRecord.bind(this));

    this.isLoggedIn$ = this.user$.do(tag$('user$')).map(user => user !== null);
    this.loggedInNotifier$
      = this.user$.pairwise()
          .filter(([was, is]) => was === null && !!is)
          .map(([, is]) => is);

    this.loggedOutNotifier$
      = this.user$.pairwise()
          .filter(([was, is]) => !!was && is === null)
          .map(([was]) => was);


    /* When the user logs in, make sure a user record exists in the db */
    // this.loggedInNotifier$
    //   .mergeMapTo(this.user$)
    //   .do()
    //   .subscribe();

    this.user$.connect();
  }

  private updateUserRecord(user: UserInfo) {
    console.log('updating or creating user record', user);
    const userInfoKeys = ['displayName', 'email', 'photoURL', 'providerId', 'uid'];
    const userInfo = userInfoKeys.reduce((info, k) => ({...info, [k]: user[k] || null}), {});

    Observable.fromPromise(
      this.usersReference.child(user.uid + '/info').set(userInfo) as Promise<void>
    )
    .subscribe(tag$('updateUserRecord'));
    // .mapTo(user)
    // .map(data =>
    //
  }

  signIn(): Observable<any> {
    const provider = new Firebase.auth.GoogleAuthProvider();
    return Observable.fromPromise(this.auth.signInWithPopup(provider) as Promise<any>);
  }

  signOut(): Observable<any> {
    return Observable.fromPromise(this.auth.signOut() as Promise<any>);
  }
}

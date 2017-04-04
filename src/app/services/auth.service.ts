import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as Firebase from 'firebase';
import { tag$ } from 'fire-slack/util/tags';
import { UserInfo, Auth } from 'fire-slack/app/interfaces';
import { FirebaseService } from './firebase.service';


@Injectable()
export class AuthService {

  private auth: Auth;
  authState$ = new BehaviorSubject<UserInfo | null>(null);
  isLoggedIn$: Observable<boolean>;
  loggedInNotifier$: Observable<UserInfo>;
  loggedOutNotifier$: Observable<UserInfo>;

  constructor(
    @Inject(FirebaseService) private firebaseService: FirebaseService
  ) {
    this.auth = this.firebaseService.app.auth();

    this.auth.onAuthStateChanged((authState: any) =>
      this.authState$.next(authState)
    );

    const authState$ = this.authState$.asObservable();

    this.isLoggedIn$ = authState$.map(user => user !== null);

    this.loggedInNotifier$
      = authState$.pairwise()
          .filter(([was, is]) => was === null && !!is)
          .map(([, is]) => is);

    this.loggedOutNotifier$
      = authState$.pairwise()
          .filter(([was, is]) => !!was && is === null)
          .map(([was]) => was);
  }

  signInWithGoogle(): Observable<any> {
    const provider = new Firebase.auth.GoogleAuthProvider();
    return Observable.fromPromise(this.auth.signInWithPopup(provider) as Promise<any>);
  }

  signInWithEmailAndPassword(email: string, password: string): Observable<any> {
    return Observable.fromPromise(this.auth.signInWithEmailAndPassword(email, password) as Promise<any>);
  }

  signOut(): Observable<any> {
    return Observable.fromPromise(this.auth.signOut() as Promise<any>);
  }
}

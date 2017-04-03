import { Injectable, Inject } from '@angular/core';
import { ConnectableObservable, Observable } from 'rxjs';
import { UserInfo, DbReference, DataSnapshot } from 'fire-slack/app/interfaces';
// import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { tag$ } from 'fire-slack/util/tags';

type UserInfoOperation = (msg: UserInfo[]) => UserInfo[];


@Injectable()
export class UserService {
  private usersRef: DbReference;
  users$: ConnectableObservable<UserInfo[]>;

  constructor(
    @Inject(FirebaseService) private firebase: FirebaseService
  ) {
    this.usersRef = this.firebase.database.ref('users');

    const usersQuery =
      Observable.bindCallback(
        cb => this.usersRef.on('value', cb),
        (data: any): DataSnapshot => data
      );

    this.users$ =
      usersQuery()
        .map((data): {[uid: string]: UserInfo} => data.val())
        .map(userObj => Object.keys(userObj).map(uid => userObj[uid]))
        .publishReplay(1);

    this.users$.connect();
  }

}

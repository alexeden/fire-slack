import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'fire-slack/app/services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(Router) private router: Router,
    @Inject(AuthService) private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('checking AuthGuard');
    console.log('route: ', route);
    console.log('state: ', state);
    return this.authService.isLoggedIn$
      .do(loggedIn => {
        console.log('loggedIn: ', loggedIn);
        if(!loggedIn) {
          console.log('navigating to login page instead');
          this.router.navigate(['/login']);
        }
      });
    // return Observable.of(false);
  }
}

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(
    @Inject(Router) private router: Router,
    @Inject(AuthService) private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('checking UnauthGuard');
    console.log('route: ', route);
    console.log('state: ', state);
    return this.authService.isLoggedIn$
      .do(loggedIn => {
        console.log('loggedIn: ', loggedIn);
        if(loggedIn === true) {
          console.log('navigating to channels page instead');
          this.router.navigate(['/channels']);
        }
      })
      .map(loggedIn => !loggedIn);
    // return Observable.of(false);
  }
}

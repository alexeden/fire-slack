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
    return this.authService.isLoggedIn$
      .do(loggedIn => {
        if(!loggedIn) {
          console.log('navigating to login page instead');
          this.router.navigate(['/login']);
        }
      });
  }
}

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(
    @Inject(Router) private router: Router,
    @Inject(AuthService) private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isLoggedIn$
      .do(loggedIn => {
        if(loggedIn === true) {
          this.router.navigate(['/channels']);
        }
      })
      .map(loggedIn => !loggedIn);
  }
}

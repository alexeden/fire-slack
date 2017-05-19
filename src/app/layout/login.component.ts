import { Component, Inject } from '@angular/core';
import { AuthService } from 'fire-slack/app/services';
import { tag$ } from 'fire-slack/util/tags';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  template: `
    <div class="container">
      <div class="row my-4">
        <div class="col-12">
          <h1 class="lead">Login with Google</h1>
        </div>
        <div class="col-12">
          <button (click)="loginWithGoogle($event)" type="button" class="btn btn-primary">Login</button>
        </div>
      </div>
    </div>

    <div class="container" [formGroup]="loginForm">
      <div class="row my-4">
        <div class="col-12">
          <h5 class="lead">Login with email and password</h5>
        </div>
      </div>
      <div class="form-group row">
        <label for="emailInput" class="col-2 col-form-label">Email</label>
        <div class="col-10">
          <input type="text" formControlName="email" class="form-control" id="emailInput" placeholder="Email address">
        </div>
      </div>
      <div class="form-group row">
        <label for="passwordInput" class="col-2 col-form-label">Password</label>
        <div class="col-10">
          <input type="password" formControlName="password" class="form-control" id="passwordInput" placeholder="Password">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-12">
          <button (click)="loginWithEmailAndPassword($event)" type="button" class="btn btn-primary ml-auto">Login</button>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(FormBuilder) private fb: FormBuilder
  ) {
    this.loginForm =
      this.fb.group({
        email: [null, Validators.compose([Validators.required, Validators.email])],
        password: [null, Validators.required]
      });
  }

  loginWithGoogle($event: Event) {
    $event.preventDefault();
    this.authService.signInWithGoogle();
  }

  loginWithEmailAndPassword($event: Event) {
    $event.preventDefault();
    const { email, password } = this.loginForm.value;
    this.authService.signInWithEmailAndPassword(email, password)
      .subscribe(tag$('login result'));
    //
  }
}

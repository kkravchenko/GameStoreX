import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../button/button.component';
import { SocialLoginComponent } from '../social-login/social-login.component';
import {
  selectUserAuth,
  selectUserById,
  UsersState,
} from '../../store/users/users.reducer';
import { emailOrPhoneValidator } from '../../validators/enail-phone/email-phone.validator';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from '../../types.dt';
import { AuthState } from '../../store/auth/auth.reducer';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login-form',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SocialLoginComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnDestroy {
  @Output() alert: EventEmitter<string> = new EventEmitter<string>();
  public userNotExists: boolean = false;
  public passwordError: boolean = false;
  private subscription: Subscription[] = [];

  constructor(
    private readonly store: Store<UsersState>,
    private readonly authStore: Store<AuthState>
  ) {}

  public formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, emailOrPhoneValidator]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  handleSubmit(): void {
    if (this.formLogin.valid) {
      const user: User = {
        login: this.formLogin.get(['email'])?.value?.target?.value,
        password: this.formLogin.get(['password'])?.value?.target?.value,
      };

      const subscription: Subscription = this.store
        .select<User[]>(selectUserById(user.login))
        .subscribe((u: User[]): void => {
          if (u.length === 0) {
            this.userNotExists = true;
          } else {
            this.store
              .select<User[]>(selectUserAuth(user.password))
              .subscribe((u: User[]) => {
                if (u.length === 0) {
                  this.passwordError = true;
                } else {
                  this.authStore.dispatch(AuthActions.addAuthUser({ user }));
                  this.alert.emit('app.user-auth-success');
                }
              });
          }
        });

      this.subscription.push(subscription);
    } else {
      for (const key in this.formLogin.controls) {
        const control = this.formLogin.get(key);
        if (control && control.invalid) {
          this.formLogin.get(key)?.markAsTouched();
          this.formLogin.get(key)?.markAsTouched();
          console.log(`Поле "${key}" не валидно`, control.errors);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.map((s: Subscription) => s.unsubscribe());
  }
}

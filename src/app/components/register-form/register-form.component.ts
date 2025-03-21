import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { SocialLoginComponent } from '../social-login/social-login.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { Store } from '@ngrx/store';
import { selectUserById, UsersState } from '../../store/users/users.reducer';
import * as UsersActions from '../../store/users/users.actions';
import { emailOrPhoneValidator } from '../../validators/enail-phone/email-phone.validator';
import { passwordMatchValidator } from '../../validators/password-confirm/password-confirm.validator';
import { User } from '../../types.dt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-form',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SocialLoginComponent,
    CheckboxComponent,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent implements OnDestroy {
  @Output() alert: EventEmitter<string> = new EventEmitter<string>();
  public userExists: boolean = false;
  private subscription: Subscription[] = [];

  constructor(private readonly store: Store<UsersState>) {}

  public formLogin = new FormGroup(
    {
      email: new FormControl('', [Validators.required, emailOrPhoneValidator]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirm: new FormControl(''),
      social: new FormControl(false),
    },
    { validators: passwordMatchValidator }
  );

  handleSubmit(): void {
    if (this.formLogin.valid) {
      const user: User = {
        login: this.formLogin.get(['email'])?.value?.target?.value,
        password: this.formLogin.get(['password'])?.value?.target?.value,
        social: this.formLogin.get(['social'])?.value.target.value,
      };

      const subscription: Subscription = this.store
        .select<User[]>(selectUserById(user.login))
        .subscribe((u: User[]): void => {
          if (u.length === 0) {
            this.store.dispatch(UsersActions.addUser({ user }));
            this.alert.emit('app.user-exists');
          } else {
            this.userExists = true;
          }
        });
      this.subscription.push(subscription);
    } else {
      for (const key in this.formLogin.controls) {
        const control = this.formLogin.get(key);
        if (control && control.invalid) {
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

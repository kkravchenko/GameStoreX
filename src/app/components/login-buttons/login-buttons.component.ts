import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { OrderButtonComponent } from '../order-button/order-button.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState, selectAuthUser } from '../../store/auth/auth.reducer';
import * as AuthActions from '../../store/auth/auth.actions';
import { User } from '../../types.dt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-buttons',
  imports: [ButtonComponent, TranslatePipe, OrderButtonComponent],
  templateUrl: './login-buttons.component.html',
  styleUrl: './login-buttons.component.scss',
})
export class LoginButtonsComponent implements OnInit, OnDestroy {
  @Output() clickLogin = new EventEmitter<number>();
  public userEmail: string = '';
  private subscription: Subscription | null = null;

  constructor(
    private readonly route: Router,
    private readonly store: Store<AuthState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectAuthUser)
      .subscribe((auth: User | null) => {
        if (auth?.login) {
          this.userEmail = auth.login;
        }
      });
  }

  onCLickLogoutButton() {
    this.userEmail = '';
    this.store.dispatch(AuthActions.delAuthUser());
  }

  onClickLoginButton() {
    this.clickLogin.emit(0);
  }

  onClickRegisterButton() {
    this.clickLogin.emit(1);
  }

  onClickOrdersButton() {
    this.route.navigateByUrl(`/orders`);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

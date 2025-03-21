import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SEOService } from '../../services/seo/seo.service';
import { LoginButtonsComponent } from '../login-buttons/login-buttons.component';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [LoginButtonsComponent, LoginComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%) scale(15%)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '600ms ease-in',
          style({ opacity: 0, transform: 'translateY(-100%) scale(15%)' })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  public isLogin: boolean = false;
  public formIndex: number = 0;

  constructor(private seo: SEOService) {}

  ngOnInit(): void {
    this.seo.setTitle('Home page');
  }

  onLogin(i: number): void {
    this.seo.setTitle('Login page');
    this.isLogin = true;
    this.formIndex = i;
  }
}

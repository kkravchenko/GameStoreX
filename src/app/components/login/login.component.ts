import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
} from '@angular/animations';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-login',
  imports: [
    TranslatePipe,
    LoginFormComponent,
    RegisterFormComponent,
    AlertComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ position: 'relative' }),
        query(
          '.tab',
          [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate(
              '300ms ease-out',
              style({ transform: 'translateX(0)', opacity: 1 })
            ),
          ],
          { optional: true }
        ),
      ]),
      transition(':decrement', [
        style({ position: 'relative' }),
        query(
          '.tab',
          [
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            animate(
              '300ms ease-out',
              style({ transform: 'translateX(0)', opacity: 1 })
            ),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('tabAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '500ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class LoginComponent implements AfterViewInit, AfterViewChecked {
  @Input() tab: number = 0;
  @Output() closeForm = new EventEmitter<any>();
  public activeTab: number = this.tab || 0;
  public indicatorTransform: string = 'translateX(0)';
  public previousTab: number = 0;
  public alertText: string = '';

  ngAfterViewChecked(): void {
    if (this.tab === 1) {
      this.previousTab = 0;
      this.activeTab = this.tab;
      this.tab = 0;
      this.updateIndicator();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.updateIndicator(), 0);
  }

  onAlert(text: string) {
    this.alertText = text;
    setTimeout(() => {
      this.alertText = '';
    }, 5000);
    if (this.activeTab === 0) {
      setTimeout(() => {
        this.closeForm.emit();
      }, 2000);
    } else {
      this.previousTab = 1;
      this.activeTab = 0;
      this.updateIndicator();
    }
  }

  get direction() {
    return this.activeTab > this.previousTab ? 1 : -1;
  }

  selectTab(index: number, event: MouseEvent): void {
    this.activeTab = index;
    this.previousTab = this.activeTab;
    this.updateIndicator(event.target as HTMLElement);
  }

  updateIndicator(targetElement?: HTMLElement): void {
    const tabs = document.querySelectorAll('.tab');
    const activeEl = targetElement || (tabs[this.activeTab] as HTMLElement);
    if (activeEl) {
      this.indicatorTransform = `translateX(${activeEl.offsetLeft}px)`;
    }
  }

  handleCloseForm(): void {
    this.closeForm.emit();
  }
}

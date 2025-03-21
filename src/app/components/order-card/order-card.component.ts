import { Component, Input } from '@angular/core';
import { Currency, Order } from '../../types.dt';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { CeilPipe } from '../../pipes/ceil/ceil.pipe';
import { RoundPipe } from '../../pipes/round/round.pipe';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-order-card',
  imports: [
    TranslatePipe,
    RouterModule,
    CeilPipe,
    RoundPipe,
    NgTemplateOutlet,
    TranslatePipe,
    ButtonComponent,
  ],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent {
  @Input() order: Order | null = null;
  @Input() currency: Currency | null = null;
  @Input() detail?: boolean = false;

  constructor() {}
}

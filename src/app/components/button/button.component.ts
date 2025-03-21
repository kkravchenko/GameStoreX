import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() width?: string = '';
  @Output('clickButton') click = new EventEmitter<MouseEvent>();

  onClick() {
    this.click.emit();
  }
}

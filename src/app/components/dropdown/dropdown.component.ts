import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Dropdown } from '../../types.dt';
import { OutsideClickDirective } from '../../directives/outside-click/outside-click.directive';

@Component({
  selector: 'app-dropdown',
  imports: [OutsideClickDirective],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggleMenu', [
      state(
        'closed',
        style({
          height: '0',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
        })
      ),
      transition('closed <=> open', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class DropdownComponent implements OnChanges {
  @Input() dropDownList: Dropdown[] = [];
  @Input() selected: number = 0;
  @Input() noList?: boolean = false;
  @Output('change') change = new EventEmitter<number>();

  public isOpen: boolean = false;
  public selectedElement: Dropdown | null = null;
  private prevChanges: any = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.prevChanges !== changes) {
      this.prevChanges = changes;

      if (!this.selected) this.selected = 1;

      const index: number = this.dropDownList.findIndex(
        (d: Dropdown) => d.id === this.selected
      );
      if (index !== -1) {
        this.selectedElement = this.dropDownList[index];
      }
    }
  }

  handelElementOnClick(id: number): void {
    if (id !== this.selectedElement?.id) {
      this.isOpen = !this.isOpen;
      this.change.emit(id);
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  onOutsideClick() {
    this.isOpen = false;
  }
}

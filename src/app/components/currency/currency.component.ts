import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  currencySelector,
  CurrencyState,
  selectCurrency,
} from '../../store/currency/currency.reducer';
import * as CurrencyActions from '../../store/currency/currency.actions';
import { skipWhile, Subscription } from 'rxjs';
import { Currency, Dropdown } from '../../types.dt';
import { DropdownComponent } from '../dropdown/dropdown.component';
import {
  selectedCurrencySelector,
  SelectedCurrencyState,
} from '../../store/selectedCurrency/selectedCurrency.reducer';
import { SET } from '../../store/selectedCurrency/selectedCurrency.action';

@Component({
  selector: 'app-currency',
  imports: [DropdownComponent],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss',
  standalone: true,
})
export class CurrencyComponent implements OnInit, AfterContentInit, OnDestroy {
  public currencies: Currency[] = [];
  public list: Dropdown[] = [];
  public selected: number = 1;
  private subscription: Subscription | null = null;

  constructor(
    private readonly store: Store<CurrencyState>,
    private readonly storeSelectCurrency: Store<SelectedCurrencyState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CurrencyActions.loadCurrency());
    this.subscription = this.store
      .select(currencySelector)
      .pipe(skipWhile((response: CurrencyState) => response.loading))
      .subscribe((response: CurrencyState) => {
        if (!response.error) {
          this.currencies = response.currencies;

          const dropDownList: Dropdown[] = [];

          this.currencies.map((c: Currency) =>
            dropDownList.push({
              id: c.id,
              Icon: c.icon,
              Name: c.name,
            })
          );
          this.list = dropDownList;
        }
      });
  }

  ngAfterContentInit(): void {
    this.storeSelectCurrency
      .select(selectedCurrencySelector)
      .subscribe((selectedCurrency: Currency) => {
        if (selectedCurrency && selectedCurrency.id !== 1) {
          this.onChange(selectedCurrency.id);
        }
      });
  }

  onChange(id: number) {
    this.selected = id;
    const currencyIndex: number = this.currencies.findIndex(
      (c: Currency) => c.id === id
    );
    if (currencyIndex !== -1) {
      this.storeSelectCurrency.dispatch(
        SET({ currency: this.currencies[currencyIndex] })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

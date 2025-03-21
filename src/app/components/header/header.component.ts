import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { CurrencyComponent } from "../currency/currency.component";
import { LangSwitcherComponent } from "../lang-switcher/lang-switcher.component";

@Component({
  selector: 'app-header',
  imports: [NavigationComponent, CurrencyComponent, LangSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}

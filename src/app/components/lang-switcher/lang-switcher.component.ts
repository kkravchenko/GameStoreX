import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Dropdown, Language } from '../../types.dt';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { langSelector, LangState } from '../../store/lang/lang.reducer';
import { SET } from '../../store/lang/lang.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lang-switcher',
  imports: [DropdownComponent],
  templateUrl: './lang-switcher.component.html',
  styleUrl: './lang-switcher.component.scss',
})
export class LangSwitcherComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  public language: Language[] = [];
  public list: Dropdown[] = [];
  public selected: number = 1;
  private subscription: Subscription | null = null;

  constructor(
    private readonly translate: TranslateService,
    private readonly store: Store<LangState>
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.language = [
      {
        id: 1,
        name: 'EN',
        icon: '/assets/images/en.svg',
      },
      {
        id: 2,
        name: 'UA',
        icon: '/assets/images/ua.svg',
      },
      {
        id: 3,
        name: 'UA',
        icon: '/assets/images/ua.svg',
      },
    ];

    const dropDownList: Dropdown[] = [];

    this.language.map((c: Language) =>
      dropDownList.push({
        id: c.id,
        Icon: c.icon,
        Name: c.name,
      })
    );
    this.list = dropDownList;
  }

  ngAfterContentInit(): void {
    this.subscription = this.store
      .select(langSelector)
      .subscribe((lang: number) => {
        if (lang && lang !== 1) {
          this.onChange(lang);
        }
      });
  }

  onChange(id: number) {
    this.selected = id;
    const index: number = this.list.findIndex((l: Dropdown) => l.id == id);
    if (index !== -1) {
      const selectedLang = this.list[index];
      this.translate.use(selectedLang.Name.toLowerCase());
      this.store.dispatch(SET({ id }));
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

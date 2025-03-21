import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  private titleSuffix: string = ' | GAMESTORE';
  private descriptionSuffix: string = '';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitleAndDescription();
      });
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title + this.titleSuffix);
  }

  setDescription(description: string): void {
    this.metaService.updateTag({
      name: 'description',
      content: description + this.descriptionSuffix,
    });
  }

  private updateTitleAndDescription(): void {
    const defaultTitle = 'Frontend test task' + this.titleSuffix;
    const defaultDescription =
      'Implements Frontend test task on Angular' + this.descriptionSuffix;
    this.setTitle(defaultTitle);
    this.setDescription(defaultDescription);
  }
}

import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
  animateChild,
} from '@angular/animations';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
            }),
          ],
          { optional: true }
        ),
        query(':enter', [style({ left: '-100%' })], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(
            ':leave',
            [animate('200ms ease-out', style({ left: '100%', opacity: 0 }))],
            { optional: true }
          ),
          query(':enter', [animate('300ms ease-out', style({ left: 0 }))], {
            optional: true,
          }),
          query('@*', animateChild(), { optional: true }),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    const context = this.contexts.getContext('primary');
    let route = context?.route?.snapshot;

    while (route?.firstChild) {
      route = route.firstChild;
    }

    return route?.data?.['animation'];
  }
}

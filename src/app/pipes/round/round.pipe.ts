import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
})
export class RoundPipe implements PipeTransform {
  transform(value: number, precision: number = 3): string {
    if (isNaN(value)) return '0';
    return value.toFixed(precision);
  }
}

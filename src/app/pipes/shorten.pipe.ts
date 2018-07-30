import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, maxLength?: number): any {
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    } else {
      return value;
    }
  }
}

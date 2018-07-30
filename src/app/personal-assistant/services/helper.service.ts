import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class HelperService {
  openModal: Subject<any> = new Subject<any>();
  updateScrollbar: Subject<any> = new Subject<any>();

  constructor() {}

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  capitalizeString(name: string): string {
    const nameArray = name.split(' ');
    let finalString = '';
    for (const i of nameArray) {
      finalString = finalString + i.charAt(0).toUpperCase() + i.slice(1) + ' ';
    }
    return finalString;
  }

  getRandomErrorResponse() {
    const responses = [
      'I\'m not sure I get that...',
      'Sorry... what was that?',
      'Sorry, I didn\'t quite get that.'
    ];

    return responses[this.getRandomInt(0, responses.length - 1)];
  }
}

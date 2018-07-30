import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
  } from '@angular/animations';

export const Animations = {
    sendAnimation: trigger('sendAnimation', [
        state(
          'sent',
          style({
            transform: 'translateY(0px)'
          })
        ),
        transition(
          '* => sent',
          animate(
            '300ms cubic-bezier(0.23, 1, 0.32, 1)',
            keyframes([
              style({ transform: 'translateY(20px)', offset: 0 }),
              style({ transform: 'translateY(18px)', offset: 0.1 }),
              style({ transform: 'translateY(16px)', offset: 0.2 }),
              style({ transform: 'translateY(14px)', offset: 0.3 }),
              style({ transform: 'translateY(12px)', offset: 0.4 }),
              style({ transform: 'translateY(10px)', offset: 0.5 }),
              style({ transform: 'translateY(8px)', offset: 0.6 }),
              style({ transform: 'translateY(6px)', offset: 0.7 }),
              style({ transform: 'translateY(4px)', offset: 0.8 }),
              style({ transform: 'translateY(0)', offset: 1.0 })
            ])
          )
        )
      ])

};

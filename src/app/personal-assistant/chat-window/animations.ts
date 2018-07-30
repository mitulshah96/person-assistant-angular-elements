import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
  } from '@angular/animations';

export const Animations = {
    toggleAnimation:
        trigger('toggleAnimation', [
          state(
            'open',
            style({
              transform: 'translateY(0px)',
              opacity: 1
            })
          ),
          state(
            'close',
            style({
              transform: 'translateY(0px)',
              opacity: 0
            })
          ),
          transition(
            'open => close',
            animate(
              150,
              keyframes([
                style({ transform: 'translateY(1px)', opacity: 1.0, offset: 0.0 }),
                style({ transform: 'translateY(2px)', opacity: 0.9, offset: 0.1 }),
                style({ transform: 'translateY(3px)', opacity: 0.8, offset: 0.2 }),
                style({ transform: 'translateY(4px)', opacity: 0.7, offset: 0.3 }),
                style({ transform: 'translateY(5px)', opacity: 0.6, offset: 0.4 }),
                style({ transform: 'translateY(6px)', opacity: 0.5, offset: 0.5 }),
                style({ transform: 'translateY(7px)', opacity: 0.4, offset: 0.6 }),
                style({ transform: 'translateY(8px)', opacity: 0.3, offset: 0.7 }),
                style({ transform: 'translateY(9px)', opacity: 0.2, offset: 0.8 }),
                style({ transform: 'translateY(10px)', opacity: 0.0, offset: 1.0 })
              ])
            )
          ),
          transition(
            'close => open',
            animate(
              150,
              keyframes([
                style({ transform: 'translateY(10px)', opacity: 0.0, offset: 0.1 }),
                style({ transform: 'translateY(9px)', opacity: 0.1, offset: 0.2 }),
                style({ transform: 'translateY(8px)', opacity: 0.2, offset: 0.3 }),
                style({ transform: 'translateY(7px)', opacity: 0.3, offset: 0.4 }),
                style({ transform: 'translateY(6px)', opacity: 0.4, offset: 0.5 }),
                style({ transform: 'translateY(5px)', opacity: 0.5, offset: 0.6 }),
                style({ transform: 'translateY(4px)', opacity: 0.6, offset: 0.7 }),
                style({ transform: 'translateY(3px)', opacity: 0.7, offset: 0.8 }),
                style({ transform: 'translateY(2px)', opacity: 0.8, offset: 0.9 }),
                style({ transform: 'translateY(1px)', opacity: 1.0, offset: 1.0 })
              ])
            )
          )
        ])
};

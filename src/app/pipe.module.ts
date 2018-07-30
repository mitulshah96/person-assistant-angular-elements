import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortenPipe } from 'app/pipes/shorten.pipe';
import { FromNowPipe } from 'app/pipes/from-now.pipe';
@NgModule({
  imports: [CommonModule],
  declarations: [
    FromNowPipe,
    ShortenPipe,
  ],
  exports: [
    FromNowPipe,
    ShortenPipe,

  ]
})
export class PipeModule {}

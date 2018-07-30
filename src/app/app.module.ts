import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'app/material.module';
import { PipeModule } from 'app/pipe.module';
import { HttpClientModule } from '@angular/common/http';

import { ChatWindowComponent } from 'app/personal-assistant/chat-window/chat-window.component';
import { ChatMessageComponent } from 'app/personal-assistant/chat-message/chat-message.component';

import { MessagesService } from 'app/personal-assistant/services/message.service';
import { HelperService } from 'app/personal-assistant/services/helper.service';
import { DelegateService } from 'app/personal-assistant/services/delegate.service';


import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { createCustomElement } from '@angular/elements';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    ChatWindowComponent,
    ChatMessageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    PipeModule,
    PerfectScrollbarModule,
    HttpClientModule,
  ],
  providers: [
    MessagesService,
    HelperService,
    DelegateService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  // bootstrap: [ ChatWindowComponent ],
  entryComponents: [ ChatWindowComponent ]
})
export class AppModule {
  constructor(private injector: Injector) {
  }
  ngDoBootstrap() {
    const chatWindow = createCustomElement(ChatWindowComponent, { injector: this.injector });
    customElements.define('chat-window', chatWindow);
  }
 }

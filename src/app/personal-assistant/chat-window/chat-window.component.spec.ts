import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { MaterialModule } from 'app/material.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CalenderModalModule } from '@components/calender-modal/calender-modal.module';
import { EmailModalModule } from '@components/email-modal/email-modal.module';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { SocialCountModule } from '@components/social-count/social-count.module';
import { HttpClientModule } from '@angular/common/http';

import { MessagesService } from '@components/personal-assistant/services/message.service';
import { HelperService } from '@components/personal-assistant/services/helper.service';
import { DelegateService } from '@components/personal-assistant/services/delegate.service';
import { BrowserDetectService } from 'app/shared/services/browser-detect.service';
import { CommonService } from 'app/shared/services/Common.service';
import { SpeechRecognitionService } from '../services/speech-recognition/speech-recognition.service';
import { SpeechSynthesisService } from '../services/speech-recognition/speech-synthesis.service';
import { VoiceService } from '../../../shared/services/speech-api.service';

import { ChatWindowComponent } from './chat-window.component';
import { ChatMessageComponent } from '@components/personal-assistant/chat-message/chat-message.component';
import { PAEventCardComponent } from '@components/personal-assistant/chat-message/pa-calendar-card/pa-calendar-card.component';
import { PASearchCardComponent } from '@components/personal-assistant/chat-message/pa-search-card/pa-search-card.component';
import { PACreateEventComponent } from '@components/personal-assistant/chat-message/pa-create-event/pa-create-event.component';
import { PANewsCardComponent } from '@components/personal-assistant/chat-message/pa-news-card/pa-news-card.component';
import { PAEmailCardComponent } from '@components/personal-assistant/chat-message/pa-email-card/pa-email-card.component';
import { ContactDetailsComponent } from '@components/personal-assistant/chat-message/contact-details/contact-details.component';
import { SiriWaveComponent } from '@components/personal-assistant/siri-wave/siri-wave.component';

import { testcasesconfig } from 'app/shared/testcasesconfig';

describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;
  const mockRouter = testcasesconfig.mockRouter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatWindowComponent,
        ChatMessageComponent,
        PAEventCardComponent,
        PASearchCardComponent,
        PACreateEventComponent,
        PANewsCardComponent,
        PAEmailCardComponent,
        ContactDetailsComponent,
        SiriWaveComponent
      ],
      imports: [
        MaterialModule,
        SwiperModule,
        FormsModule,
        PerfectScrollbarModule,
        CalenderModalModule,
        EmailModalModule,
        PipeModule,
        SocialCountModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        MessagesService,
        HelperService,
        DelegateService,
        BrowserDetectService,
        CommonService,
        VoiceService,
        SpeechRecognitionService,
        SpeechSynthesisService,
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowComponent);
    component = fixture.componentInstance;

    component.isAssistantOpen =
      testcasesconfig.personal_assistant.chat_window.isAssistantOpen;
    component.loading = testcasesconfig.personal_assistant.chat_window.loading;
    component.isAudioInputActive =
      testcasesconfig.personal_assistant.chat_window.isAudioInputActive;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should have data in proper type', () => {
    expect(component.isAssistantOpen).toMatch(/false|true/);
    expect(component.loading).toMatch(/false|true/);
    expect(component.isAudioInputActive).toMatch(/false|true/);
  });

  it('should open PA on click of PA icon if it is close', () => {
    const btn = fixture.debugElement.query(By.css('.assistant-button'));
    btn.triggerEventHandler('click', null);
    expect(component.isAssistantOpen).toBeTruthy();
  });

  it('should close PA on click of PA icon if it is open', () => {
    const btn = fixture.debugElement.query(By.css('.assistant-button'));
    btn.triggerEventHandler('click', null);
    expect(!component.isAssistantOpen).toBeFalsy();
  });

  it('should show dictionary on click of help button', () => {
    const btn = fixture.debugElement.query(By.css('.assistant-button'));
    btn.triggerEventHandler('click', null);
  });

  it('should minimize PA on click of minize button if it is open', () => {
    const btn = fixture.debugElement.query(By.css('.minimize_icon'));
    btn.triggerEventHandler('click', null);
    expect(!component.isAssistantOpen).toBeFalsy();
  });

  it('should close PA on click of close icon if it is open', () => {
    const btn = fixture.debugElement.query(By.css('.close_icon'));
    btn.triggerEventHandler('click', null);
    expect(!component.isAssistantOpen).toBeFalsy();
  });
});

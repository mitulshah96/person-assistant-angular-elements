import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PASearchCardComponent } from '@components/personal-assistant/chat-message/pa-search-card/pa-search-card.component';

import { PAEventCardComponent } from '@components/personal-assistant/chat-message/pa-calendar-card/pa-calendar-card.component';

import { PACreateEventComponent } from '@components/personal-assistant/chat-message/pa-create-event/pa-create-event.component';

import { PANewsCardComponent } from '@components/personal-assistant/chat-message/pa-news-card/pa-news-card.component';

import { PAEmailCardComponent } from '@components/personal-assistant/chat-message/pa-email-card/pa-email-card.component';
import { ChatMessageComponent } from './chat-message.component';

import { ContactDetailsComponent } from '@components/personal-assistant/chat-message/contact-details/contact-details.component';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { MaterialModule } from 'app/material.module';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatMessageComponent,
        PASearchCardComponent,
        PAEventCardComponent,
        PACreateEventComponent,
        PANewsCardComponent,
        PAEmailCardComponent,
        ContactDetailsComponent
      ],
      imports: [PipeModule, MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper Message data', () => {
    expect(component.message).toBeDefined();
  });
  it('should have non-null userData & have object type', () => {
    expect(component.userData).toBeTruthy();
    expect(typeof component.userData === 'object').toBeTruthy();
  });
  it('should have non-null and of type string: user and bot icons', () => {
    expect(
      component.userImage !== '' && typeof component.userImage === 'string'
    ).toBeTruthy();
    expect(
      component.botImage !== '' && typeof component.botImage === 'string'
    ).toBeTruthy();
  });

  it('should have minCount & maxCount of type Number', () => {
    expect(isNaN(component.minSearchCount)).toBeFalsy();
    expect(isNaN(component.minEmailCount)).toBeFalsy();
    expect(isNaN(component.minContactCount)).toBeFalsy();

    expect(isNaN(component.maxSearchCount)).toBeFalsy();
    expect(isNaN(component.maxEmailCount)).toBeFalsy();
    expect(isNaN(component.maxContactCount)).toBeFalsy();
  });

  it('should have min count to be 2', () => {
    expect(component.minSearchCount).toBe(2);
    expect(component.minEmailCount).toBe(2);
    expect(component.minContactCount).toBe(2);
  });

  it('should have max count > 2 & < 10', () => {
    expect(component.maxSearchCount).toBeGreaterThan(2);
    expect(component.maxEmailCount).toBeGreaterThan(2);
    expect(component.maxContactCount).toBeGreaterThan(2);

    expect(component.maxSearchCount).toBeLessThanOrEqual(10);
    expect(component.maxEmailCount).toBeLessThanOrEqual(10);
    expect(component.maxContactCount).toBeLessThanOrEqual(10);
  });
});

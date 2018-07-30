import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';


import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { config } from 'app/config';


import { Message } from '../model/message.model';
import { MessagesService } from '../services/message.service';
import { HelperService } from '../services/helper.service';
import { DelegateService } from '../services/delegate.service';
import { Animations } from './animations';

import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  animations: [Animations.toggleAnimation],
  // changeDetection: ChangeDetectionStrategy.Default,
  // encapsulation: ViewEncapsulation.Native
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  @Input() isLoading = false;

  @Output() voiceAction = new EventEmitter(); // for voice only
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll: PerfectScrollbarDirective;

  messages$: Observable<Message[]>;

  textFieldValue = '';
  listItems: any[];
  botImage = config.personal_assistant.chat_icon.bot.image;
  destroy$: Subject<boolean> = new Subject<boolean>(); // to unsubscribe from all subscriptions

  draftMessage: Message;

  // assistant parameters
  showVoiceButton = true;
  isVoiceInputTaken = false;
  isAssistantOpen = false;
  isFirstLoad = false;
  isAutocompleteVisible = false;
  speechInputStart = false; // start taking user input through speech
  isTextInputActive = false;

  todayDate: Date;
  assistantState = 'close';
  recording = false;
  toolTipDelay = 500;
  position = 'above';

  // autosuggest params
  suggestions: string[];
  remainingChar = '';
  lastMatchedString = '';

  config: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };

  activeIndex = 0;

  constructor(
    private messagesService: MessagesService,
    private helperService: HelperService,
    private delegateService: DelegateService,
    private el: ElementRef,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('on init');

    this.draftMessage = new Message();

    // for all new messages
    this.messagesService.messages.pipe(takeUntil(this.destroy$)).subscribe();
    this.messages$ = this.messagesService.messages;

    // create the initial messages
    this.delegateService.initialMessages.map((message: Message) => {
      this.messagesService.addMessage(message);
    });

    this.setupChatWindow();
  }

  ngOnDestroy() {
    this.isAssistantOpen = false;
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  // ================================================== //
  // ******************** Class Methods *************** //
  // ================================================== //

  /**
   * initialize and setup the chat window
   */

  setupChatWindow(): void {
    this.setupSubscriptions();

    this.todayDate = new Date();
    this.isAssistantOpen = false;
    this.isFirstLoad = true;
    this.messagesService
      .userMessages()
      .pipe(takeUntil(this.destroy$))
      .forEach((message: Message) => {
        this.messagesService.getData(message.text).subscribe(
          response => {
            this.isLoading = false;
            this.parseJSONData(response);
          },
          error => {
            console.error(error);
            this.isLoading = false;
            this.messagesService.addTextOnlyMessageForBot(
              'I am having trouble processing your request.'
            );
            // this.ref.detectChanges();
          }
        );
      });
  }

  setupSubscriptions() {
    // scroll to bottom on PA window if a message is added to messages array
    this.messages$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        this.scrollToBottom();
      });
    });


    // UPDATE THE SCROLL BAR ON CLICK OF SHOW ALL BUTTON FOR EMAILS, EVENTS, SEARCH COMPONENTS
    this.helperService.updateScrollbar
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        this.directiveScroll.update();
      });
  }

  /**
   * formats the data received from the server and displays the data as 'messages' in the PA UI
   * @param resultData - The data received from the server
   */
  parseJSONData(resultData: any): void {
    if (resultData) {
      const data = resultData;
      // this.ref.detectChanges();
      this.delegateService.checkMessageType(data);
    }
  }


  /** to check if textfield is empty and return true if it is */
  public get isTextFieldEmpty(): boolean {
    const isWhiteSpace = (this.textFieldValue || '').trim().length;
    if (isWhiteSpace === 0) {
      return true;
    } else {
      return false;
    }
  }

  // ================================================== //
  // ******************** DOM Methods ***************** //
  // ================================================== //

  /**
   * send the user query to the server to get the response
   * @param query - the query on which user clicked
   */
  onClickQuery(query: string) {
    this.textFieldValue = '';
    this.isLoading = true;
    this.messagesService.addTextOnlyMessage(query.replace(/"/g, ''));
  }

  /** to change status of loading when button is clicked for query */
  changeStatus(): void {
    this.textFieldValue = '';
    this.isLoading = true;
  }

  /** to scroll to bottom when user sends a query */
  scrollToBottom(): void {
    // const scrollPane: any = this.el.nativeElement.querySelector(
    //   '.msg-container-base'
    // );
    // scrollPane.scrollTop = scrollPane.scrollHeight;
  }

  /** to send user query on pressing enter */
  onEnter(event: any): void {
    if (!this.isTextFieldEmpty) {
      this.isLoading = true;
      this.isTextInputActive = true;
      this.sendMessage();
      event.preventDefault();
    }
  }

  /** create a new message for user's query and send to server to get the response */
  sendMessage(): void {
    this.messagesService.addTextOnlyMessage(this.textFieldValue);
    this.textFieldValue = '';
  }

  /** use to open/close the PA window */
  toggleAssistant(isDelete: boolean): void {
    this.isFirstLoad = false;
    this.isAssistantOpen = !this.isAssistantOpen;
    // this.ref.detectChanges();
    this.assistantState = this.assistantState === 'close' ? 'open' : 'close';

    if (this.isAssistantOpen) {
      // do something when PA window is open
    } else {
      if (isDelete) {
        this.textFieldValue = '';
        this.messagesService.clearMessages();
      }
      this.isLoading = false;
    }
  }
}

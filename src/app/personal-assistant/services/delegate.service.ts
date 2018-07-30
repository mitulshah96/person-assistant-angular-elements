import { Injectable } from '@angular/core';
import * as lodash from 'lodash';
import { Subject } from 'rxjs';
import { config } from 'app/config';

import { Message } from '../model/message.model';

import { MessagesService } from '../services/message.service';
import { HelperService } from '../services/helper.service';
@Injectable()
export class DelegateService {
  isAudioInputActive = false; // check if user gave input through speec
  hideIntentsWindow = true;
  listItems: any[];
  speechInputStart = false;
  showAudioLoadingAnimation = new Subject<boolean>();

  initialMessages: Array<Message> = config.personal_assistant.initial_messages.map(msg => {
    return new Message({
      author: 'bot',
      text: msg
    });
  });


  constructor(
    private messagesService: MessagesService,
    private helperService: HelperService
  ) {
  }

  checkMessageType(data: any) {
    const parameters = data.parameters;
    const fulfillment = data.fulfillment;
    const messages = fulfillment.messages;

    if (messages.length > 0) {
      messages.forEach(msg => {
        switch (msg.type) {
          case 0:
            if (msg.speech !== '') {
              this.messagesService.addTextOnlyMessageForBot(msg.speech);
            } else {
              // SHOW ERROR MESSAGE TO USER IF NO RESPONSE FROM SERVER
              this.messagesService.addTextOnlyMessageForBot(
                this.helperService.getRandomErrorResponse()
              );
            }
            break;

          default:
            this.messagesService.addTextOnlyMessageForBot(
              this.helperService.getRandomErrorResponse()
            );
            break;
        }
      });
    } else {
      this.messagesService.addTextOnlyMessageForBot(
        this.helperService.getRandomErrorResponse()
      );
    }
  }
}

import { Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation } from '@angular/core';

import { MessagesService } from './../services/message.service';
import { Message } from './../model/message.model';

import { config } from 'app/config';
import { Animations } from './animations';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  animations: [ Animations.sendAnimation ],
  // encapsulation: ViewEncapsulation.Native
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  @Output() msgLoading: EventEmitter<any> = new EventEmitter<any>();
  userData = JSON.parse(localStorage.getItem('user'));

  botImage = config.personal_assistant.chat_icon.bot.image;


  userImage = config.personal_assistant.chat_icon.user.image;
  state: string;
  incoming: boolean;
  isLoading: boolean;
  text: string;

  constructor(
    public messagesService: MessagesService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.incoming = this.message.author === 'bot';

    if (!this.incoming) {
      this.state = 'sent';
    }
  }

  // adding the message after clicking on the action button
  queryOnClick(query: string) {
    this.msgLoading.emit();
    this.messagesService.addTextOnlyMessage(query);
  }

  isBotAvatarVisible(message: Message): boolean {
    if (message.type === 'default' || message.type === 'initial_suggestions') {
      return true;
    } else {
      return false;
    }
  }
}

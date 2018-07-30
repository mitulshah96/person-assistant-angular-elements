import { Suggestion } from './../model/suggestion.model';

/**
 * Message represents one message being sent in a Thread
 */
export class Message {
  id: string;
  type: string;
  sentAt: Date;
  status: boolean;
  author: string;
  text: string;
  suggestions: Suggestion[];
  listItems: any[];
  eventData: any;
  data: any;
  constructor(obj?: any) {
    this.sentAt = (obj && obj.sentAt) || new Date();
    this.status = (obj && obj.status) || false;
    this.author = (obj && obj.author) || null;
    this.text = (obj && obj.text) || '';
    this.suggestions = (obj && obj.suggestions) || [];
    this.listItems = (obj && obj.listItems) || [];
    this.type = (obj && obj.type) || 'default';
    this.eventData = (obj && obj.eventData) || {};
    this.data = (obj && obj.data) || {};
  }
}

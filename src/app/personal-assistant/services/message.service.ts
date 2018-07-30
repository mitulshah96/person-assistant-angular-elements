import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { Message } from '../model/message.model';
import { environment } from '@env/environment';
import { map, filter, scan, publishReplay, refCount, catchError } from 'rxjs/operators';

const initialMessages: Message[] = [];

type IMessagesOperation = (messages: Message[]) => Message[];

@Injectable()
export class MessagesService {
  private apiURL: string;

  // a stream that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();

  // `messages` is a stream that emits an array of the most up to date messages
  messages: Observable<Message[]>;

  // `updates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently
  // stored in `messages`)
  updates: Subject<any> = new Subject<any>();

  // action streams
  create: Subject<Message> = new Subject<Message>();

  constructor(private http: HttpClient) {
    this.messages = this.updates.pipe(
      // watch the updates and accumulate operations on the messages
      scan((messages: Message[], operation: IMessagesOperation) => {
        return operation(messages);
      }, initialMessages)).
      // make sure we can share the most recent list of messages across anyone
      // who's interested in subscribing and cache the last known list of
      // messages
      pipe(publishReplay(1)).
      pipe(refCount());

    this.setup();
  }

  private setup() {
    // `create` takes a Message and then puts an operation (the inner function)
    // on the `updates` stream to add the Message to the list of messages.
    //
    // That is, for each item that gets added to `create` (by using `next`)
    // this stream emits a concat operation function.
    //
    // Next we subscribe `this.updates` to listen to this stream, which means
    // that it will receive each operation that is created
    //
    // Note that it would be perfectly acceptable to simply modify the
    // "addMessage" function below to simply add the inner operation function to
    // the update stream directly and get rid of this extra action stream
    // entirely. The pros are that it is potentially clearer. The cons are that

    // the stream is no longer composable.
    this.create.pipe(
      map(function(message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          if (message.type === 'clear') {
            return [
              new Message({
                author: 'bot',
                text: 'Hi'
              })
            ];
          } else {
            return messages.concat(message);
          }
        };
      }))
      .subscribe(this.updates);

    this.newMessages.subscribe(this.create);
  }

  // an imperative function call to this action stream
  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  userMessages(): Observable<Message> {
    return this.newMessages.pipe(filter((message: Message) => {
      return message.author === 'user';
    }));
  }

  getData(query: string): Observable<Response> {
    this.apiURL = `${environment.paBasePath}/api/pams`;
      const body = {
        lang: 'en',
        sessionId: '1234',
        query: query,
      };
      return this.http.post<Response>(this.apiURL, body);


      // .catch((error: any) => {
      //   console.log('error');
      //   if (error.status === 302 || error.status === '302') {
      //     // do some thing
      //   } else {
      //     return Observable.throw(new Error(error.status));
      //   }
      // });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
  // clear all the message in the window if user closes PA
  clearMessages() {
    this.newMessages.next(new Message({ type: 'clear' }));
  }

  /**
   * add text message to the newMessages[] in message.service
   * @param text - The text of the message
   */
  addTextOnlyMessage(text: string) {
    this.addMessage(
      new Message({
        text: text,
        author: 'user',
        type: 'default'
      })
    );
  }

  /**
   * add text message to the newMessages[] in message.service
   * @param text - The text of the message
   */
  addTextOnlyMessageForBot(text: string) {
    this.addMessage(
      new Message({
        author: 'bot',
        text: text,
        type: 'default'
      })
    );
  }

  /**
   * add card message of the respective type to the newMessages[] in message.service
   * @param type - The type of data
   * @param items - The actual data items
   */

  addCardMessage(type: string, items: any[]) {
    this.addMessage(
      new Message({
        author: 'bot',
        type: type,
        listItems: items
      })
    );
  }
}

export const messagesServiceInjectables: Array<any> = [MessagesService];

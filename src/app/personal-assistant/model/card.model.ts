

/**
 * Card represents one card-message being sent
 */
export class Card {

    imageUrl: string;
    title: string;
    subtitle: string;
    text: string;
    weblinkTitle: string;
    weblink: string;

     constructor(obj?: any) {
       this.imageUrl      = obj && obj.imageUrl      || '';
       this.title         = obj && obj.title         || '';
       this.subtitle      = obj && obj.subtitle      || '';
       this.text          = obj && obj.text          || '';
       this.weblinkTitle  = obj && obj.weblinkTitle  || '';
       this.weblink       = obj && obj.weblink       || '';
     }
   }

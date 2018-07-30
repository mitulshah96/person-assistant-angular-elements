export class Suggestion {
  text: string;
  actionType: string;

  constructor(obj?: any) {
    this.text       = obj && obj.text || '';
    this.actionType = obj && obj.actionType || 'default';
  }
}

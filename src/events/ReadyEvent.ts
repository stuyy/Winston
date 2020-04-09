import BaseEvent from '../structures/BaseEvent';

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }

  public exec(): void {
    // eslint-disable-next-line no-console
    console.log(this.user.tag);
  }
}

import BaseEvent from '../structures/base/BaseEvent';
import Bot from '../bot/Bot';

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }

  public exec(bot: Bot, ...args: Array<any>): void {
    // eslint-disable-next-line no-console
    console.log(`${bot.user.tag} has logged in.`);
  }
}

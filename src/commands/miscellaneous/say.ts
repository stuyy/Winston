
import { Message } from 'discord.js';
import BaseCommand from '../../structures/base/BaseCommand';
import Bot from '../../bot/Bot';

export default class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'miscellaneous', []);
    this.getCommandConfigurable()
      .setExpectArgs(true);
  }

  public async exec(bot: Bot, message: Message, args: Array<any>| null): Promise<void> {
    message.channel.send(args.join(' '));
  }
}

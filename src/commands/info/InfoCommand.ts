import { Message } from 'discord.js';
import BaseCommand from '../../structures/base/BaseCommand';
import Bot from '../../bot/Bot';

export default class InfoCommand extends BaseCommand {
  constructor() {
    super('info', 'information', [], []);
    this.getCommandConfigurable()
      .setExpectArgs(false);
  }

  async exec(bot: Bot, message: Message, args: Array<any> | null): Promise<void> {
    // Check permissions of the author, compare it with the permissions of the Command.
    message.channel.send('Info Command Works!');
  }
}

import { Message } from 'discord.js';
import BaseCommand from '../../structures/base/BaseCommand';
import Bot from '../../bot/Bot';

export default class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', [], []);
    this.getCommandConfigurable()
      .setDelimiter(/\s+/)
      .setExpectArgs(true);
  }

  public async exec(bot: Bot, message: Message, args: Array<string> | null): Promise<void> {
    // do something
    message.channel.send(`Your arguments: ${args.join(' ')}`);
  }
}

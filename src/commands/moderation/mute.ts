import { Message } from 'discord.js';
import BaseCommand from '../../structures/base/BaseCommand';
import Bot from '../../bot/Bot';

export default class MuteCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', [], []);
    this.getCommandConfigurable()
      .setDelimiter(/\s+/)
      .setExpectArgs(true);
  }

  public async exec(bot: Bot, message: Message, args: Array<string> | null): Promise<void> {
    // do something
    message.channel.send('Mute');
  }
}

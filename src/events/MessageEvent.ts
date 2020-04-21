import { Message } from 'discord.js';
import BaseEvent from '../structures/base/BaseEvent';
import Bot from '../bot/Bot';
import { getCommandName } from '../utils/commands';

export default class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  public exec(bot: Bot, message: Message): void {
    if (message.author.bot || message.channel.type === 'dm') return;
    const prefix = bot.getBotConfig().getPrefix();
    const { content } = message;
    if (content.startsWith(prefix)) {
      const cmdName = getCommandName(prefix, message.content); // Get the command name
      const command = bot.getCommands().get(cmdName);
      if (command) bot.emit('textCommand', command, message);
    }
  }
}

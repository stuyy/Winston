import { Message } from 'discord.js';
import BaseEvent from '../structures/base/BaseEvent';
import Bot from '../bot/Bot';
import {
  getCommandArguments,
  getCommandName,
  getCommandArgumentsWithDelimiter,
} from '../utils/commands';
import BaseCommand from '../structures/base/BaseCommand';

export default class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  public exec(bot: Bot, message: Message): void {
    if (message.author.bot || message.channel.type === 'dm') return;
    const prefix = bot.getBotConfig().getPrefix();
    const { content } = message;
    if (content.startsWith(prefix)) {
      // Get the command name
      const cmdName = getCommandName(prefix, message.content);
      // Check if command name is in the command registry
      if (bot.getCommands().has(cmdName)) {
        const command: BaseCommand = bot.getCommands().get(cmdName);
        if (command.getCommandConfigurable().argsRequired()) {
          // Parse arguments with command.
          const delimiter = command.getCommandConfigurable().getDelimiter();
          const args = getCommandArgumentsWithDelimiter(prefix, cmdName, content, delimiter);
          command.exec(bot, message, args);
        } else {
          command.exec(bot, message, null);
        }
      }
    } else {
      // do something
    }
  }
}

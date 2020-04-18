/* eslint-disable no-console */
import { Message, Permissions } from 'discord.js';
import BaseEvent from '../structures/base/BaseEvent';
import Bot from '../bot/Bot';
import BaseCommand from '../structures/base/BaseCommand';
import { getCommandArgumentsWithDelimiter } from '../utils/commands';

export default class TextCommandEvent extends BaseEvent {
  constructor() {
    super('textCommand');
  }

  public exec(bot: Bot, command: BaseCommand, message: Message): void {
    const prefix = bot.getBotConfig().getPrefix();
    const { content } = message;
    if (command.getPermissionGuard().isRequired()) {
      const { permissions } = message.member;
      const perms = new Permissions(permissions.bitfield);
      if (command.getPermissionGuard().checkPermissions(perms)) {
        message.channel.send('You have permissions');
        if (command.getCommandConfigurable().argsRequired()) {
          const delimiter = command.getCommandConfigurable().getDelimiter();
          const args = getCommandArgumentsWithDelimiter(
            prefix, command.getName(), content, delimiter,
          );
          command.exec(bot, message, args)
            .then(() => console.log('Command Invoked Successfully'))
            .catch((err) => console.log(err));
        } else command.exec(bot, message, null);
      } else {
        message.channel.send('You do not have permissions.');
      }
    } else {
      message.channel.send('Permissions not required');
    }
  }
}

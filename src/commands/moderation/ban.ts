import { Message } from 'discord.js';
import BaseCommand from '../../structures/base/BaseCommand';
import Bot from '../../bot/Bot';
import { generateEmbed } from '../../utils/helpers';

export default class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
    this.getCommandConfigurable()
      .setDelimiter(/\s+/)
      .setExpectArgs(true);
    this.getPermissionGuard()
      .setRequired(false)
      .setCommandPermissions(['BAN_MEMBERS', 'KICK_MEMBERS']);
  }

  public async exec(bot: Bot, message: Message, args: Array<string> | null): Promise<any> {
    // do something
    if (args.length < 2) {
      return Promise.reject(new Error('Incorrect amount of arguments'));
    }
    const [id, days, ...reason] = args;
    const banReason = reason.join(' ');
    const member = message.guild.members.cache.get(id);
    if (member) {
      const bannedUser = await member.ban({ days: parseInt(days, 10), reason: banReason });
      const embed = generateEmbed(`Banned ${bannedUser.user.tag} for ${days} days. Reason: ${banReason}`);
      const msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      return Promise.resolve(true);
    }
    const embed = generateEmbed(`Member with ${id} not found.`);
    message.channel.send(embed);
    return Promise.reject(new Error('Member not found'));
  }
}

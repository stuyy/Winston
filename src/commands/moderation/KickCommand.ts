import { Message, GuildMember } from 'discord.js';
import BaseCommand from '../../structures/base/BaseCommand';
import Bot from '../../bot/Bot';
import { generateEmbed } from '../../utils/helpers';

export default class KickCommand extends BaseCommand {
  public async exec(bot: Bot, message: Message, args: Array<string> | null): Promise<any> {
    if (args.length < 1) return Promise.reject(new Error('Incorrect amount of arguments'));
    const [id, ...reason] = args;
    if (id === message.author.id) return Promise.reject(new Error('Cannot kick self'));
    const kickReason = reason.join(' ');
    const member = message.guild.members.cache.get(id);
    if (member) {
      if (this.checkPermissions(member) && !this.isOwner(message)) {
        message.channel.send(generateEmbed('Cannot kick that user.'));
        return Promise.reject(new Error('Cannot kick that user.'));
      }
      const kickedUser = await member.kick(kickReason);
      const embed = generateEmbed(`Kicked ${kickedUser.user.tag}. Reason: ${kickReason}`);
      const msg = await message.channel.send(embed);
      await msg.delete({ timeout: 10000 });
      return Promise.resolve(true);
    }
    const embed = generateEmbed(`Member with ${id} not found.`);
    message.channel.send(embed);
    return Promise.reject(new Error('Member not found'));
  }

  checkPermissions(member: GuildMember) {
    return member.permissions.has('BAN_MEMBERS')
    || member.permissions.has('KICK_MEMBERS')
    || member.permissions.has('ADMINISTRATOR');
  }

  isOwner = (message: Message) => message.author.id === message.guild.ownerID;
}

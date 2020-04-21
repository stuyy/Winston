import { Message, GuildMember } from 'discord.js';
import BaseCommand from '../../structures/base/BaseCommand';
import Bot from '../../bot/Bot';
import { generateEmbed } from '../../utils/helpers';

export default class UnbanCommand extends BaseCommand {
  public async exec(bot: Bot, message: Message, args: Array<string> | null): Promise<any> {
    if (args.length < 1) return Promise.reject(new Error('Incorrect amount of arguments'));
    const [id] = args;
    if (id === message.author.id) return Promise.reject(new Error('Cannot unban self'));
    await message.guild.members.unban(id);
    return message.channel.send(`Unbanned user with id: ${id}`);
  }
}

import {
  Message,
  MessageEmbed,
  Guild,
  version,
  User,
  MessageReaction,
} from 'discord.js';
import BaseCommand from '../../structures/base/BaseCommand';
import Bot from '../../bot/Bot';

export default class InfoCommand extends BaseCommand {
  async exec(bot: Bot, message: Message, args: Array<any> | null): Promise<void> {
    // Check permissions of the author, compare it with the permissions of the Command.
    const reducer = (total: number, value: number) => total + value;
    const filter = (reaction: MessageReaction, user: User) => message.author.id === user.id;
    const { owner } = await bot.fetchApplication();
    const embed = new MessageEmbed()
      .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
      .setThumbnail(bot.user.displayAvatarURL())
      .setColor('#00A4FF')
      .addField('Created Date', `${bot.user.createdAt.toLocaleDateString()}`)
      .addField('Guilds', `${bot.guilds.cache.size}`, true)
      .addField('Members', `${bot.guilds.cache.map((g: Guild) => g.memberCount).reduce(reducer)}`, true)
      .addField('Channels', `${bot.channels.cache.size}`, true)
      .addField('Discord.JS', `${version}`, true)
      .addField('Latency', `${bot.ws.ping} ms`, true)
      // eslint-disable-next-line radix
      .addField('Uptime', `${Math.round(bot.uptime / 1000)} seconds.`)
      .addField('Created By', `${owner}`)
      .setFooter(`I'm ${bot.user.tag}, and I love peanut butter.`);

    const msg = await message.channel.send(embed);
    await msg.react('🗑️');
    const reaction = await msg.awaitReactions(filter, { max: 1, time: 60000 });
    if (reaction.first().emoji.name === '🗑️') {
      await msg.delete({ timeout: 500 });
      await message.delete({ timeout: 500 });
    }
  }
}

import {
  Message, MessageEmbed, GuildMember, Role,
} from 'discord.js';
import Bot from '../../bot/Bot';
import BaseCommand from '../../structures/base/BaseCommand';

export default class StatsCommand extends BaseCommand {
  constructor() {
    super('stats', 'miscellaneous', [], []);
    this.getCommandConfigurable()
      .setExpectArgs(true);
  }

  public async exec(bot: Bot, message: Message, args: Array<string>): Promise<void> {
    const [id] = args;
    const { guild } = message;
    const member: GuildMember = guild.members.cache.get(id);
    const embed = new MessageEmbed();
    if (member) {
      embed
        .setAuthor(`${member.user.tag}`, `${member.user.displayAvatarURL()}`)
        .addField('Roles', `${member.roles.cache.map((r: Role) => r.toString()).join(' ')}`);
      message.channel.send(embed);
    } else {
      embed.setDescription(`Member with ${id} was not found.`);
      message.channel.send(embed);
    }
  }
}

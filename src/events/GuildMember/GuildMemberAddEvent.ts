import { GuildMember } from 'discord.js';
import BaseEvent from '../../structures/base/BaseEvent';
import Bot from '../../bot/Bot';

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }

  public exec(bot: Bot, member: GuildMember): void {
    member.send('hello!');
  }
}

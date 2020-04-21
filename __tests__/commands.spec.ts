/* eslint-disable no-undef */
import { Message, TextChannel, Guild } from 'discord.js';
import Bot from '../src/bot/Bot';
import InfoCommand from '../src/commands/info/InfoCommand';
import BaseCommand from '../src/structures/base/BaseCommand';
import commands from '../src/config/commands';

describe('should test all commands', () => {
  let info: BaseCommand;
  let bot: Bot;
  const command = commands.InfoCommand;
  beforeAll(() => {
    info = new InfoCommand(
      command.name,
      command.category,
      command.aliases,
      command.permissionOptions,
      command.commandOptions,
    );
    bot = new Bot({});
    jest.spyOn(bot, 'addCommand');
  });

  afterEach((done) => {
    done();
  });

  test('should add info command', () => {
    bot.addCommand(info);
    expect(bot.addCommand).toHaveBeenCalledTimes(1);
    expect(bot.addCommand).toHaveBeenCalledWith(info);
  });

  test('should check if info command exists', () => {
    expect(bot.getCommands().size).toEqual(1);
    expect(bot.getCommands().get(info.getName()).getName()).toEqual('info');
  });

  test('check if message.channel returns a function', async () => {
    const guild: Guild = new Guild(bot, {});
    const channel: TextChannel = new TextChannel(guild, {});
    const msg: Message = new Message(bot, {}, channel);
    info.exec = jest.fn().mockImplementation(() => Promise.resolve('Good!'));
    const res = await info.exec(bot, msg, []);
    expect(info.exec).toHaveBeenCalledTimes(1);
    expect(info.exec).toHaveBeenCalledWith(bot, msg, []);
    expect(res).toBe('Good!');
  });
});

/* eslint-disable no-undef */
import Bot from '../src/bot/Bot';
import BaseCommand from '../src/structures/BaseCommand';
import MockCommand from '../__mocks__/commands/help.mock';
import CommandHandler from '../src/structures/CommandHandler';

describe('spying on Bot methods', () => {

  const bot: Bot = new Bot({});
  const cmd: BaseCommand = new MockCommand('mock', 'mock', [], []);
  jest.spyOn(bot, 'addCommand');
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach((done) => done());
  it('should call addCommand and add a command', () => {
    bot.addCommand(cmd);
    expect(bot.addCommand).toHaveBeenCalledTimes(1);
    expect(bot.addCommand).toHaveBeenCalledWith(cmd);
    expect(bot.addCommand).not.toReturnWith(true);
  });

  it('should check if all fields are valid', () => {
    expect(cmd.getName()).toBe('mock');
    expect(cmd.getCategory()).toBe('mock');
    expect(cmd.getAliases()).toBeInstanceOf(Array);
    expect(cmd.getPermissions()).toBeInstanceOf(Array);
  });

  it('should check if CommandHandler has 1 command', () => {
    expect(bot.getCommands()).toBeInstanceOf(CommandHandler);
    expect(bot.getCommands().size).toBe(1);
    expect(bot.getCommands().get(cmd.getName())).toBe(cmd);
  });

  it('should add another command', () => {
    const newCmd: BaseCommand = new MockCommand('kick', 'kick', [], []);
    bot.addCommand(newCmd);
    expect(bot.addCommand).toHaveBeenCalledTimes(1);
    expect(bot.addCommand).toHaveBeenCalledWith(newCmd);
    expect(bot.addCommand).not.toReturnWith(true);
  });

  it('should check if CommandHandler has 2 commands', () => {
    expect(bot.getCommands().size).toBe(2);
  });
});

describe('adds three commands', () => {

  const bot: Bot = new Bot({});

  jest.spyOn(bot, 'addCommand');
  jest.spyOn(bot, 'deleteCommand');
  jest.spyOn(bot, 'searchCommand');

  afterEach((done) => done());

  it('should add three commands', () => {
    const cmd1 = new MockCommand('ban', 'moderation', ['banuser'], ['MANAGE_ROLES']);
    const cmd2 = new MockCommand('kick', 'moderation', ['kickuser'], ['KICK_MEMBERS']);
    const cmd3 = new MockCommand('mute', 'moderation', ['muteuser'], ['MANAGE_GUILD']);
    bot.addCommand(cmd1).addCommand(cmd2).addCommand(cmd3);
    expect(bot.addCommand).toHaveBeenCalledWith(cmd1);
    expect(bot.addCommand).toHaveBeenCalledWith(cmd2);
    expect(bot.addCommand).toHaveBeenCalledWith(cmd3);
    expect(bot.addCommand).toHaveBeenCalledTimes(3);
  });

  it('should check if there are three commands', () => {
    expect(bot.getCommands().size).toEqual(3);
  });

  it('should delete a command from the CommandHandler', () => {
    const cmdName = 'ban';
    expect(bot.getCommands().has(cmdName)).toBe(true);
    const deleted = bot.deleteCommand(cmdName);
    expect(deleted).toEqual(bot);
  });

  it('should have two commands', () => {
    expect(bot.getCommands().size).toEqual(2);
    expect(bot.deleteCommand).toHaveBeenCalledTimes(1);
  });

  it('should search for previously deleted command', () => {
    const cmdName = 'ban';
    const result = bot.searchCommand(cmdName);
    expect(result).not.toBeInstanceOf(BaseCommand);
  });
});

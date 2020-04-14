/* eslint-disable no-undef */

import Bot from '../src/bot/Bot';
import MockCommand from '../__mocks__/commands/help.mock';
import BaseCommand from '../src/structures/base/BaseCommand';
import CommandHandler from '../src/structures/CommandHandler';

jest.mock('../src/bot/Bot', () => jest.fn().mockImplementation(() => ({
  addCommand: () => 'command added',
  getRegister: () => 'register',
  addEvent: () => 'event added',
  getCommands: () => 'commands',
})));

jest.mock('../__mocks__/commands/help.mock', () => jest.fn().mockImplementation(() => ({
  getCategory: (): Array<any> => [],
  getAliases: (): Array<any> => [],
  getPermissions: (): Array<String> => [],
  getCommandHandler: (): CommandHandler => new CommandHandler(),
  setCommandHandler: (x: CommandHandler): void => undefined,
  exec: (): void => undefined,
})));

describe('Testing Bot Module', () => {
  let bot: Bot;
  let command: BaseCommand;

  beforeEach(() => {
    jest.clearAllMocks();
    bot = new Bot({});
    command = new MockCommand('testing', 'testing', [], []);
  });

  afterEach((done) => done());

  it('should call the constructor of Bot once', () => {
    expect(Bot).toHaveBeenCalledTimes(1);
  });

  it('should instantiate a Bot', () => {
    expect(bot).toBeTruthy();
  });

  it('should checks instances of functions', () => {
    expect(bot.addCommand).toBeInstanceOf(Function);
    expect(bot.getRegister).toBeInstanceOf(Function);
    expect(bot.addEvent).toBeInstanceOf(Function);
    expect(bot.getCommands).toBeInstanceOf(Function);
  });

  it('should call addCommand with command', () => {
    expect(MockCommand).toHaveBeenCalledTimes(1);
    expect(bot.addCommand(command)).toEqual('command added');
  });

  it('should expect no return from exec', () => {
    expect(command.exec).toBeInstanceOf(Function);
  });

  it('should return commands', () => {
    expect(command.getCategory()).toBeInstanceOf(Array);
  });

  it('should return categories', () => {
    expect(command.getCategory()).toBeInstanceOf(Array);
  });
});

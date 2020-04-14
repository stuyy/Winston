/* eslint-disable no-undef */
import * as utils from '../src/utils/commands';

describe('testing command utility functions', () => {
  describe('testing getCommandArguments function', () => {
    let prefix: string;
    let message: string;
    let command: string;
    let index: number;
    const prefixes = ['win/', 'cin/', '--', '$'];
    const commands = ['help', 'info', 'test', 'win/'];
    const messages = [
      'hello test command       ',
      '      testing command arguments one two three',
      ',, , ,   , my arg,s',
      'this c,m,md, t      e   s t commands',
    ];
    beforeAll(() => {
      jest.spyOn(utils, 'getCommandArguments');
      index = 0;
    });
    afterEach(() => index++);
    describe('run four tests and increment index', () => {
      beforeAll(() => {
        expect(prefixes.length).toEqual(commands.length);
        expect(commands.length).toEqual(messages.length);
        expect(messages.length).toEqual(prefixes.length);
      });
      test('it should test win/ prefix and help command', () => {
        prefix = prefixes[index];
        expect(prefix).toEqual('win/');
        command = commands[index];
        message = `${prefix}${command} ${messages[index]}`;
        const [cmd, ...args] = utils.getCommandArguments(prefix, message);
        expect(utils.getCommandArguments).toBeCalledTimes(1);
        expect(cmd).toEqual('help');
        expect(cmd).toEqual(command);
        expect(args.length).toEqual(3);
      });
      test('it should test cin/ prefix and info command', () => {
        prefix = prefixes[index];
        expect(prefix).toEqual('cin/');
        command = commands[index];
        message = `${prefix}${command} ${messages[index]}`;
        const [cmd, ...args] = utils.getCommandArguments(prefix, message);
        expect(cmd).toEqual('info');
        expect(cmd).toEqual(command);
        expect(utils.getCommandArguments).toHaveBeenCalledTimes(2);
        expect(args.length).toEqual(6);
        expect(args.length).toEqual(messages[index].trim().split(/\s+/).length);
      });
      test('it should test -- command', () => {
        prefix = prefixes[index];
        expect(prefix).toEqual('--');
        command = commands[index];
        message = `${prefix}${command} ${messages[index]}`;
        const [cmd, ...args] = utils.getCommandArguments(prefix, message);
        expect(utils.getCommandArguments).toBeCalledTimes(3);
        expect(cmd).toEqual('test');
        expect(cmd).toEqual(command);
        expect(args.length).toEqual(messages[index].split(/\s+/).length);
      });
    });
  });
  describe('testing extractAfterCommandName function', () => {
    let prefix: string;
    let message: string;
    let command: string;
    let args: string;
    beforeAll(() => {
      jest.spyOn(utils, 'extractAfterCommandName');
    });
    test('ensure a string is returned', () => {
      prefix = 'win/';
      command = 'kick';
      args = '1234567899013425';
      message = `${prefix}${command} ${args}`;
      let val = utils.extractAfterCommandName(prefix, `${message}`);
      expect(val).toEqual('1234567899013425');
      args = '1342343253253244 4324234243242 2423423423423';
      message = `${prefix}${command} ${args}`;
      val = utils.extractAfterCommandName(prefix, `${message}`);
      expect(val).toEqual(args);
    });
    test('when string starts with whitespace', () => {
      prefix = 'win/';
      command = 'kick';
      args = '      1234567899013425       ';
      message = `${prefix}${command} ${args}`;
      let val = utils.extractAfterCommandName(prefix, `${message}`);
      expect(val).toEqual('1234567899013425');
      args = '        1342343253253244 4324234243242 2423423423423   ';
      message = `${prefix}${command} ${args}`;
      val = utils.extractAfterCommandName(prefix, `${message}`);
      expect(val).toEqual(args.trim());
    });
  });
  describe('testing splitArgumentsOnRegex function', () => {
    beforeAll(() => {
      jest.spyOn(utils, 'splitArgumentsOnRegex');
    });
    test('splits a string by commas', () => {
      const delimiter = ',';
      const content = '123456, 894566,443245,342562';
      const args = utils.splitArgumentsOnRegex(content, delimiter);
      expect(args.length).toEqual(4);
    });
    test('splits a string by comma and whitespace', () => {
      const delimiter = new RegExp(/\s*,\s+/);
      const content = '43245,      2342, 23432, 4  , 44444, 222';
      const args = utils.splitArgumentsOnRegex(content, delimiter);
      expect(args.length).toBe(6);
      expect(args[3]).toEqual('4');
    });
    test('splits a string by comma with whitespace in front and end', () => {
      const delimiter = new RegExp(/s*,\s+/);
      const content = '     445  ,  55 6 6, 34456,   ';
      const args = utils.splitArgumentsOnRegex(content, delimiter);
      expect(args.length).toBe(3);
    });
  });
});

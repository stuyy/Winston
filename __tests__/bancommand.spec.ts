/* eslint-disable no-undef */
import { Message, Permissions } from 'discord.js';
import Bot from '../src/bot/Bot';
import BanCommand from '../src/commands/moderation/ban';
import BaseCommand from '../src/structures/base/BaseCommand';

describe('testing ban command', () => {
  const bot: Bot = new Bot({});
  const ban: BaseCommand = new BanCommand();
  beforeEach((done) => {
    done();
  });

  test('it should add the Ban Command to Bot command handler', () => {
    expect(ban.getName()).toEqual('ban');
    expect(ban.getCategory()).toEqual('moderation');
    expect(bot.getCommands().size).toEqual(0);
    bot.addCommand(ban);
    expect(bot.getCommands().size).toEqual(1);
  });

  test('pass in one argument and return error', async () => {
    jest.spyOn(ban, 'exec');
    try {
      await ban.exec(bot, null, ['ab']);
      expect(ban.exec).toHaveBeenCalledTimes(1);
    } catch (err) {
      expect(ban.exec).toHaveBeenCalledTimes(1);
      expect(err).toBeInstanceOf(Error);
    }
  });

  test('expect ban command to have correct permissions', () => {
    const permissions = ban.getPermissionGuard().getCommandPermissions();
    expect(permissions.includes('BAN_MEMBERS')).toEqual(true);
    expect(permissions.includes('KICK_MEMBERS')).toEqual(true);
    expect(permissions.includes('ADMINISTRATOR')).not.toEqual(true);
  });

  test('expect permissions to be valid with Permission instance', () => {
    expect(ban.getPermissionGuard()
      .checkPermissions(new Permissions(6)))
      .toEqual(true);
  });

  test('if user has only kick members but not ban members return false', () => {
    const permissions = new Permissions(114);
    expect(permissions.has('KICK_MEMBERS')).toEqual(true);
    expect(ban.getPermissionGuard()
      .checkPermissions(permissions))
      .not
      .toEqual(true);
  });
});

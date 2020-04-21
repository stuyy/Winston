/* eslint-disable no-undef */
import InfoCommand from '../../src/commands/info/InfoCommand';
import Commands from '../../src/config/commands';
import PermissionGuard from '../../src/structures/configs/permissions/PermissionGuard';

describe('testing info command', () => {
  const cmd = Commands.InfoCommand;
  const infoCmd: InfoCommand = new InfoCommand(
    cmd.name, cmd.category, cmd.aliases, cmd.permissionOptions, cmd.commandOptions,
  );
  const guard: PermissionGuard = infoCmd.getPermissionGuard();

  test('it should expect info command to have all correct fields', () => {
    expect(infoCmd.getName()).toEqual(cmd.name);
    expect(infoCmd.getCategory()).toEqual(cmd.category);
    expect(infoCmd.getAliases()).not.toStrictEqual(['Hello World']);
    expect(infoCmd.getCommandConfigurable().argsRequired()).toBe(false);
    expect(infoCmd.getCommandConfigurable().getDelimiter()).toEqual(/\s+/);
  });

  test('it should split arguments correctly', () => {
    const content = 'Hello     World    My   Name   Jeff';
    const args = content.split(infoCmd.getCommandConfigurable().getDelimiter());
    expect(args.length).toEqual(5);
    expect(args).toStrictEqual(['Hello', 'World', 'My', 'Name', 'Jeff']);
  });

  test('it should have permissions required set to false', () => {
    expect(guard.isRequired()).toStrictEqual(false);
  });

  test('it should set the permission requirement to true', () => {
    infoCmd.getPermissionGuard().setRequired(true);
    expect(guard.isRequired()).toStrictEqual(true);
  });

  test('it should check permissions and expect an empty array', () => {
    expect(guard.getCommandPermissions()).toStrictEqual([]);
  });

  test('add permission to permission guard', () => {
    guard.setCommandPermissions(['MANAGE_MEMBERS']);
    expect(guard.getCommandPermissions()).toStrictEqual(['MANAGE_MEMBERS']);
  });

  test('check if permission guard has correct permissions', () => {
    const result = guard.checkPermissions(['MANAGE_MEMBERS']);
    expect(result).toBe(true);
    if (result) guard.setCommandPermissions(['KICK_MEMBERS', 'BAN_MEMBERS']);
    expect(guard.getCommandPermissions())
      .toStrictEqual(['KICK_MEMBERS', 'BAN_MEMBERS']);
  });
});

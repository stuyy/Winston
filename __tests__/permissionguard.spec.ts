/* eslint-disable no-undef */
import { Permissions } from 'discord.js';
import PermissionGuard from '../src/structures/configs/permissions/PermissionGuard';

describe('testing permission guard class', () => {
  const guard: PermissionGuard = new PermissionGuard({
    required: true,
    permissions: ['MANAGE_GUILD', 'KICK_MEMBERS', 'BAN_MEMBERS'],
  });
  const perms: Permissions = new Permissions(67648);

  jest.spyOn(guard, 'checkPermissions');

  test('expect permissions to have size 3', () => {
    expect(guard.getCommandPermissions().length).toBe(3);
  });

  test('expect permissions to be correct', () => {
    expect(guard.getCommandPermissions()).toContain('MANAGE_GUILD');
    expect(guard.getCommandPermissions()).toContain('KICK_MEMBERS');
    expect(guard.getCommandPermissions()).toContain('BAN_MEMBERS');
  });

  test('expect permissions to be valid', () => {
    const memberPermissions = ['ADMINISTRATOR', 'BAN_MEMBERS', 'KICK_MEMBERS', 'VIEW_CHANNELS', 'READ_MESSAGES', 'MANAGE_GUILD'];
    const result = guard.checkPermissions(memberPermissions);
    expect(result).toEqual(true);
  });

  test('expect permissions to have send messages and add reactions', () => {
    expect(perms.has('READ_MESSAGE_HISTORY')).toEqual(true);
    expect(perms.has('ADD_REACTIONS')).toEqual(true);
    expect(perms.has('ADMINISTRATOR')).not.toEqual(true);
  });

  test('pass Permissions instance', () => {
    const value = guard.checkPermissions(perms);
    expect(value).not.toEqual(true);
  });

  test('pass permission instance and return true', () => {
    const permissions = new Permissions(50);
    expect(permissions.has('ADMINISTRATOR')).not.toEqual(true);
    expect(permissions.has('MANAGE_CHANNELS')).toEqual(true);
    expect(permissions.has('MANAGE_GUILD')).toEqual(true);
    expect(permissions.has('KICK_MEMBERS')).toEqual(true);
    const value = guard.checkPermissions(permissions);
    expect(value).toEqual(false);
  });

  test('when user has ADMIN permissions they should have all permissions', () => {
    const permissions = new Permissions(8);
    const value = guard.checkPermissions(permissions);
    expect(value).toBe(true);
    expect(permissions.has('BAN_MEMBERS')).toEqual(true);
    expect(permissions.has('ADMINISTRATOR')).toEqual(true);
    expect(permissions.has('EMBED_LINKS')).toEqual(true);
  });

  test('check if user has admin permissions', () => {
    const permissions = new Permissions(71735);
    expect(permissions.has('ADMINISTRATOR')).toEqual(false);
    expect(permissions.toArray().length).toEqual(8);
  });
});

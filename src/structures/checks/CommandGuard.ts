import ICommandGuard from './ICommandGuard';

export default class CommandGuard {
  static checkPermissions(permission: string, permissions: Array<string>): boolean {
    return permissions.includes(permission);
  }
}

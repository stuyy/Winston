import { Permissions } from 'discord.js';
import PermissionOptions from '../../interfaces/PermissionOptions';

export default class PermissionGuard {
  private requiredPermissions: boolean;

  private commandPermissions: Array<string>;

  constructor(permissionOptions: PermissionOptions) {
    this.requiredPermissions = permissionOptions.required;
    this.commandPermissions = permissionOptions.permissions;
  }

  /**
   * Checks permissions and return true if all permissions are satisfied.
   * @param memberPerms the permissions of a Member. String or Array<string>
   * @param permissions the permissions of the command to test against
   */
  public checkPermissions(memberPermissions: Array<string> | Permissions): boolean {
    if (memberPermissions instanceof Array) {
      return this.commandPermissions.every((x: string) => memberPermissions.includes(x));
    }
    if (memberPermissions instanceof Permissions) {
      const memberPerms = this.getMemberPermissions(memberPermissions);
      return this.commandPermissions.every((x: string) => memberPerms.includes(x));
    }
    return false;
  }

  private getMemberPermissions(permissions: Permissions): Array<string> {
    return permissions.toArray();
  }

  /**
   * Permissions required
   * @returns true if required
   */
  public isRequired(): boolean {
    return this.requiredPermissions;
  }

  public setRequired(flag: boolean): PermissionGuard {
    this.requiredPermissions = flag;
    return this;
  }

  public setCommandPermissions(permissions: Array<string>): PermissionGuard {
    this.commandPermissions = permissions;
    return this;
  }

  public getCommandPermissions(): Array<String> {
    return this.commandPermissions;
  }
}

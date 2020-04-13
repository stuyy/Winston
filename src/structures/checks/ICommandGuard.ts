/* eslint-disable semi */
/* eslint-disable no-extra-semi */
import BaseCommand from '../base/BaseCommand';

export default interface ICommandGuard {
  checkPermissions(permission: string, permissions: Array<string>): boolean;
}

import { promises as fs } from 'fs';
import path from 'path';
import { EventEmitter } from 'events';
import BaseCommand from '../structures/base/BaseCommand';
import { asyncForEach } from './asyncUtils';
import BaseEvent from '../structures/base/BaseEvent';
import cmdConfigs from '../config/commands';

const matcher = new RegExp(/\.(js|ts)$/);
const commands: any = cmdConfigs;
export default class Register extends EventEmitter {
  public async registerCommands(dir: string) {
    const filePath: string = path.join(__dirname, dir);
    const files: Array<string> = await this.getFiles(filePath);
    if (files.length === 0) return null;
    await asyncForEach(files, async (file: string) => {
      const isDir: boolean = await this.isDir(path.join(filePath, file));
      if (isDir) await this.registerCommands(path.join(dir, file));
      if (matcher.test(file)) {
        const cmdFileName = file.slice(0, -3);
        const { default: BaseCommandClass } = await import(path.join(dir, file));
        const options = commands[cmdFileName];
        const command: BaseCommand = new BaseCommandClass(
          options.name,
          options.category,
          options.aliases,
          options.permissionOptions,
          options.commandOptions,
        );
        if (command instanceof BaseCommand) {
          this.emit('commandRegistered', command);
        }
      }
    });
    return true;
  }

  public async registerEvents(dir: string) {
    const filePath: string = path.join(__dirname, dir);
    const files: Array<string> = await this.getFiles(filePath);
    if (files.length === 0) return null;
    await asyncForEach(files, async (file: string) => {
      const isDir: boolean = await this.isDir(path.join(filePath, file));
      if (isDir) await this.registerEvents(path.join(dir, file));
      else if (file.endsWith('.ts') || file.endsWith('.js')) {
        const { default: BaseEventClass } = await import(path.join(dir, file));
        const event = new BaseEventClass();
        if (event instanceof BaseEvent) {
          this.emit('eventRegistered', event);
        }
      }
    });
    return true;
  }

  public async getFiles(filePath: string) {
    return fs.readdir(filePath);
  }

  private isDir = async (dir: string) => {
    const d = await fs.lstat(dir);
    return d.isDirectory();
  }
}

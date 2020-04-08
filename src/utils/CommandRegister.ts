import { promises as fs } from 'fs';
import path from 'path';
import { EventEmitter } from 'events';
import BaseCommand from '../structures/BaseCommand';
import { asyncForEach } from './asyncUtils';

export default class ClientRegister extends EventEmitter {
  public async registerCommands(dir: string) {
    const filePath: string = path.join(__dirname, dir);
    const files: Array<any> = await this.getFiles(filePath);
    if (files.length === 0) return null;
    await asyncForEach(files, async (file: string) => {
      const isDir: boolean = await this.isDir(path.join(filePath, file));
      if (isDir) await this.registerCommands(path.join(dir, file));
      else if (file.endsWith('.ts')) {
        const { default: BaseCommandClass } = await import(path.join(dir, file));
        const command = new BaseCommandClass();
        if (command instanceof BaseCommand) {
          this.emit('commandRegistered', command);
        }
      }
    });
    return true;
  }

  private async getFiles(filePath: string) {
    return fs.readdir(filePath);
  }

  private isDir = async (dir: string) => {
    const d = await fs.lstat(dir);
    return d.isDirectory();
  }
}

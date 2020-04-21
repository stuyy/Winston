import { Message } from 'discord.js';
import CommandHandler from '../CommandHandler';
import Bot from '../../bot/Bot';
import CommandConfigurable from '../configs/configurable/CommandConfigurable';
import PermissionGuard from '../configs/permissions/PermissionGuard';
import CommandOptions from '../interfaces/CommandOptions';
import PermissionOptions from '../interfaces/PermissionOptions';

/* eslint-disable lines-between-class-members */
export default abstract class BaseCommand {
  private handler: CommandHandler;
  private name: string;
  private category: string;
  private aliases: Array<string>;
  private permissions: PermissionGuard;
  private commandConfig: CommandConfigurable;

  constructor(
    name: string,
    category: string,
    aliases: Array<string>,
    permissionOptions: PermissionOptions,
    commandOptions: CommandOptions,
  ) {
    this.name = name;
    this.category = category;
    this.aliases = aliases;
    this.permissions = new PermissionGuard(permissionOptions);
    this.commandConfig = new CommandConfigurable(commandOptions);
  }

  public getName(): string { return this.name; }
  public getCategory(): string { return this.category; }
  public getAliases(): Array<String> { return this.aliases; }
  public setCommandHandler(handler: CommandHandler): void { this.handler = handler; }
  public getCommandHandler(): CommandHandler { return this.handler; }
  public getCommandConfigurable(): CommandConfigurable { return this.commandConfig; }
  public getPermissionGuard(): PermissionGuard { return this.permissions; }
  public abstract async exec(bot: Bot, message: Message, args: Array<any>| null): Promise<void>;
}

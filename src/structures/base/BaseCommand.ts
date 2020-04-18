import { Message } from 'discord.js';
import CommandHandler from '../CommandHandler';
import Bot from '../../bot/Bot';
import CommandConfigurable from '../checks/CommandConfigurable';
import PermissionGuard from '../configs/permissions/PermissionGuard';

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
    permissions?: Array<string>,
  ) {
    this.name = name;
    this.category = category;
    this.aliases = aliases;
    this.permissions = new PermissionGuard(permissions);
    this.commandConfig = new CommandConfigurable();
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

import CommandHandler from './CommandHandler';

/* eslint-disable lines-between-class-members */
export default abstract class BaseCommand {
  private handler: CommandHandler | undefined;

  constructor(
    private name: string,
    private category: string,
    private aliases: Array<string>,
    private permissions: Array<string>,
  ) {
    this.name = name;
    this.category = category;
    this.aliases = aliases;
    this.permissions = permissions;
  }

  public getName(): string { return this.name; }
  public getCategory(): string { return this.category; }
  public getAliases(): Array<String> { return this.aliases; }
  public getPermissions(): Array<String> { return this.permissions; }
  public setCommandHandler(handler: CommandHandler): void { this.handler = handler; }
  public getCommandHandler(): CommandHandler | undefined { return this.handler; }

  public abstract exec(): void;
}

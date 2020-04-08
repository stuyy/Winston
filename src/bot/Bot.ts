import { Client, ClientOptions } from 'discord.js';
import ClientRegister from '../utils/CommandRegister';
import CommandHandler from '../structures/CommandHandler';
import BaseCommand from '../structures/BaseCommand';

export default class Bot extends Client {
  private register: ClientRegister;

  private commands: CommandHandler;

  constructor(private o: ClientOptions) {
    super(o);
    this.register = new ClientRegister();
    this.commands = new CommandHandler();
  }

  public getRegister = (): ClientRegister => this.register;

  public getCommands = (): CommandHandler => this.commands;

  public addCommand(command: BaseCommand): void {
    this.commands.set(command.getName(), command);
  }
}

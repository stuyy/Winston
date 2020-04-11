import { Client, ClientOptions } from 'discord.js';
import ClientRegister from '../utils/Register';
import CommandHandler from '../structures/CommandHandler';
import BaseCommand from '../structures/BaseCommand';
import BaseEvent from '../structures/BaseEvent';
import EventHandler from '../structures/EventHandler';

export default class Bot extends Client {

  private register: ClientRegister;

  private commands: CommandHandler;

  private events: EventHandler;

  constructor(private o: ClientOptions) {
    super(o);
    this.register = new ClientRegister();
    this.commands = new CommandHandler();
    this.events = new EventHandler();
  }

  /**
   * Gets register
   * @returns register 
   */
  public getRegister(): ClientRegister {
    return this.register;
  }

  /**
   * Gets commands
   * @returns commands
   */
  public getCommands(): CommandHandler {
    return this.commands;
  }

  /**
   * Adds command to the CommandHandler
   * @param command the command instance
   * @returns instance of the Bot
   */
  public addCommand(command: BaseCommand): Bot {
    this.commands.set(command.getName(), command);
    return this;
  }

  /**
   * Deletes the command from CommandHandler
   * @param command the name of the command
   * @returns false if command not found, bot instance otherwise
   */
  public deleteCommand(command: string): Bot | boolean {
    const cmd = this.searchCommand(command);
    if (cmd) {
      this.commands.delete(cmd.getName());
      // need to delete all aliases.
      return this;
    }
    return false;
  }

  /**
   * Searchs command by name
   * @param command name of the command
   * @returns command or null
   */
  public searchCommand(command: string) : BaseCommand | null {
    return this.commands.get(command) ? this.commands.get(command) : null;
  }

  public addEvent(event: BaseEvent): void {
    this.events.set(event.getName(), event);
    const name = event.getName();
    this.on(name, event.exec.bind(this));
  }
}

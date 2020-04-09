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

  public getRegister = (): ClientRegister => this.register;

  public getCommands = (): CommandHandler => this.commands;

  public addCommand(command: BaseCommand): void {
    this.commands.set(command.getName(), command);
  }

  public addEvent(event: BaseEvent): void {
    this.events.set(event.getName(), event);
    const name = event.getName();
    this.on(name, event.exec.bind(this));
  }
}

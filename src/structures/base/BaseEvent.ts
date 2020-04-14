import Bot from '../../bot/Bot';

export default abstract class BaseEvent {
  constructor(private name: string) {
    this.name = name;
  }

  public getName(): any { return this.name; }

  public abstract exec(bot: Bot, args: any): void;
}

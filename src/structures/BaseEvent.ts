import Bot from '../bot/Bot';

export default abstract class BaseEvent {
  [x: string]: any;

  constructor(
    private name: string,
  ) {
    this.name = name;
  }

  public getName(): any { return this.name; }

  public abstract exec(args: any): void;
}

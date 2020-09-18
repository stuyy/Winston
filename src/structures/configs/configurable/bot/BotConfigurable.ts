import IBotConfigurable from './IBotConfigurable';

export default class BotConfigurable implements IBotConfigurable {
  prefix: string;

  public setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  public getPrefix(): string {
    return this.prefix;
  }
}

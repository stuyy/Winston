import BaseCommand from '../../structures/base/BaseCommand';

export default class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', [], []);
    this.getCommandConfigurable()
      .setDelimiter(/\s+/)
      .setExpectArgs(true);
  }

  public async exec(): Promise<void> {
    // do something
  }
}

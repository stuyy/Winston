import BaseCommand from '../../structures/BaseCommand';

export default class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', [], []);
  }

  public exec(): void {

  }
}

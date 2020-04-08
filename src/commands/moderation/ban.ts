import BaseCommand from '../../structures/BaseCommand';

export default class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', [], []);
  }

  public exec(): void {

  }
}

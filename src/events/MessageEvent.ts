import { Message } from 'discord.js';
import BaseEvent from '../structures/BaseEvent';

export default class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  public exec(message: Message): void {

  }
}

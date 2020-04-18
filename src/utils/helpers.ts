/* eslint-disable import/prefer-default-export */
import { MessageEmbed } from 'discord.js';

export function generateEmbed(msg: string) {
  return new MessageEmbed()
    .setDescription(msg);
}

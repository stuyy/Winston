import { config } from 'dotenv';
import Bot from './bot/Bot';
import Register from './utils/Register';
import BaseCommand from './structures/BaseCommand';
import BaseEvent from './structures/BaseEvent';

const register = new Register();

async function init() {
  const bot = new Bot({});
  await register.registerCommands('../commands');
  await register.registerEvents('../events');
  bot.login(process.env.BOT_TOKEN);
  register.on('commandRegistered', (command: BaseCommand) => {
    bot.addCommand(command);
  });
  register.on('eventRegistered', (event: BaseEvent) => {
    bot.addEvent(event);
  });
}

(async () => {
  try {
    if (process.env.ENVIRONMENT === 'DEVELOPMENT') {
      config();
      await init();
    } else await init();
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.log(ex);
  }
})();

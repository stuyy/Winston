import { config } from 'dotenv';
import Bot from './bot/Bot';
import Register from './utils/Register';
import BaseCommand from './structures/BaseCommand';
import BaseEvent from './structures/BaseEvent';

const register = new Register();

async function init() {
  const bot = new Bot({});
  register.registerCommands('../commands')
    .then(() => register.registerEvents('../events'))
    .then(() => bot.login(process.env.BOT_TOKEN))
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));

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

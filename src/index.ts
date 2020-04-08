import { config } from 'dotenv';
import Bot from './bot/Bot';
import ClientRegister from './utils/CommandRegister';
import BaseCommand from './structures/BaseCommand';
import CommandHandler from './structures/CommandHandler';

const register = new ClientRegister();

async function init() {
  const bot = new Bot({});
  await register.registerCommands('../commands');
  await bot.login(process.env.BOT_TOKEN);
  register.on('commandRegistered', (command: BaseCommand) => {
    bot.addCommand(command);
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

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const Bot_1 = __importDefault(require("./bot/Bot"));
const CommandRegister_1 = __importDefault(require("./utils/CommandRegister"));
const register = new CommandRegister_1.default();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const bot = new Bot_1.default({});
        yield register.registerCommands('../commands');
        yield bot.login(process.env.BOT_TOKEN);
        register.on('commandRegistered', (command) => {
            bot.addCommand(command);
        });
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.ENVIRONMENT === 'DEVELOPMENT') {
            dotenv_1.config();
            yield init();
        }
        else
            yield init();
    }
    catch (ex) {
        // eslint-disable-next-line no-console
        console.log(ex);
    }
}))();

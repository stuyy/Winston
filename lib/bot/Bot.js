"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Register_1 = __importDefault(require("../utils/Register"));
const CommandHandler_1 = __importDefault(require("../structures/CommandHandler"));
const EventHandler_1 = __importDefault(require("../structures/EventHandler"));
class Bot extends discord_js_1.Client {
    constructor(o) {
        super(o);
        this.o = o;
        this.getRegister = () => this.register;
        this.getCommands = () => this.commands;
        this.register = new Register_1.default();
        this.commands = new CommandHandler_1.default();
        this.events = new EventHandler_1.default();
    }
    addCommand(command) {
        this.commands.set(command.getName(), command);
    }
    addEvent(event) {
        this.events.set(event.getName(), event);
        const name = event.getName();
        this.on(name, event.exec.bind(this));
        console.log('Registered ' + name);
    }
}
exports.default = Bot;
//# sourceMappingURL=Bot.js.map
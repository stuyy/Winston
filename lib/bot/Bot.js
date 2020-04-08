"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandRegister_1 = __importDefault(require("../utils/CommandRegister"));
const CommandHandler_1 = __importDefault(require("../structures/CommandHandler"));
class Bot extends discord_js_1.Client {
    constructor(o) {
        super(o);
        this.o = o;
        this.getRegister = () => this.register;
        this.getCommands = () => this.commands;
        this.register = new CommandRegister_1.default();
        this.commands = new CommandHandler_1.default();
    }
    addCommand(command) {
        this.commands.set(command.getName(), command);
    }
}
exports.default = Bot;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEvent_1 = __importDefault(require("../structures/BaseEvent"));
class ReadyEvent extends BaseEvent_1.default {
    constructor() {
        super('ready');
    }
    exec(client, ...args) {
        // eslint-disable-next-line no-console
        console.log(`${client.user.tag} has logged in.`);
    }
}
exports.default = ReadyEvent;
//# sourceMappingURL=ReadyEvent.js.map
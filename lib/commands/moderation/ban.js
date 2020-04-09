"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = __importDefault(require("../../structures/BaseCommand"));
class BanCommand extends BaseCommand_1.default {
    constructor() {
        super('ban', 'moderation', [], []);
    }
    exec() {
    }
}
exports.default = BanCommand;
//# sourceMappingURL=ban.js.map
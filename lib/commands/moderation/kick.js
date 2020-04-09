"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = __importDefault(require("../../structures/BaseCommand"));
class KickCommand extends BaseCommand_1.default {
    constructor() {
        super('kick', 'moderation', [], []);
    }
    exec() {
    }
}
exports.default = KickCommand;
//# sourceMappingURL=kick.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class AnimalCrossingBot extends discord_js_1.Client {
    constructor(o) {
        super(o);
        this.o = o;
    }
}
exports.default = AnimalCrossingBot;

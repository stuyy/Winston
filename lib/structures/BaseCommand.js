"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable lines-between-class-members */
class BaseCommand {
    constructor(name, category, aliases, permissions) {
        this.name = name;
        this.category = category;
        this.aliases = aliases;
        this.permissions = permissions;
        this.name = name;
        this.category = category;
        this.aliases = aliases;
        this.permissions = permissions;
    }
    getName() { return this.name; }
    getCategory() { return this.category; }
    getAliases() { return this.aliases; }
    getPermissions() { return this.permissions; }
    setCommandHandler(handler) { this.handler = handler; }
    getCommandHandler() { return this.handler; }
}
exports.default = BaseCommand;

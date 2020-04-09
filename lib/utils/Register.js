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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const events_1 = require("events");
const BaseCommand_1 = __importDefault(require("../structures/BaseCommand"));
const asyncUtils_1 = require("./asyncUtils");
const BaseEvent_1 = __importDefault(require("../structures/BaseEvent"));
class ClientRegister extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.isDir = (dir) => __awaiter(this, void 0, void 0, function* () {
            const d = yield fs_1.promises.lstat(dir);
            return d.isDirectory();
        });
    }
    registerCommands(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.join(__dirname, dir);
            const files = yield this.getFiles(filePath);
            if (files.length === 0)
                return null;
            yield asyncUtils_1.asyncForEach(files, (file) => __awaiter(this, void 0, void 0, function* () {
                const isDir = yield this.isDir(path_1.default.join(filePath, file));
                if (isDir)
                    yield this.registerCommands(path_1.default.join(dir, file));
                else if (file.endsWith('.ts') || file.endsWith('.js')) {
                    const { default: BaseCommandClass } = yield Promise.resolve().then(() => __importStar(require(path_1.default.join(dir, file))));
                    const command = new BaseCommandClass();
                    if (command instanceof BaseCommand_1.default) {
                        this.emit('commandRegistered', command);
                    }
                }
            }));
            return true;
        });
    }
    registerEvents(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.join(__dirname, dir);
            const files = yield this.getFiles(filePath);
            if (files.length === 0)
                return null;
            yield asyncUtils_1.asyncForEach(files, (file) => __awaiter(this, void 0, void 0, function* () {
                const isDir = yield this.isDir(path_1.default.join(filePath, file));
                if (isDir)
                    yield this.registerEvents(path_1.default.join(dir, file));
                else if (file.endsWith('.ts')) {
                    const { default: BaseEventClass } = yield Promise.resolve().then(() => __importStar(require(path_1.default.join(dir, file))));
                    const event = new BaseEventClass();
                    if (event instanceof BaseEvent_1.default) {
                        console.log('Yo');
                        this.emit('eventRegistered', event);
                    }
                }
            }));
            return true;
        });
    }
    getFiles(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return fs_1.promises.readdir(filePath);
        });
    }
}
exports.default = ClientRegister;
//# sourceMappingURL=Register.js.map
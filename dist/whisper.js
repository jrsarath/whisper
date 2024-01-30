"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Whisper: WhisperCTX } = require(path_1.default.join(__dirname, '../lib/whisper.node'));
const whisperInstance = (0, util_1.promisify)(WhisperCTX);
const defaultParams = {
    language: 'en',
    model: path_1.default.join(__dirname, '../lib/whisper-tiny.bin'),
    file: path_1.default.join(__dirname, '../lib/a13.wav'),
    use_gpu: true,
    debug: false,
};
const whisper = (args) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            const params = {
                ...defaultParams,
            };
            for (const key in args) {
                if (Object.prototype.hasOwnProperty.call(params, key)) {
                    params[key] = args[key];
                }
            }
            const transcript = await whisperInstance(params);
            resolve(transcript);
        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    });
};
exports.default = whisper;
//# sourceMappingURL=whisper.js.map
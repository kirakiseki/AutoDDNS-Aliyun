"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const default_credential_1 = __importDefault(require("./default_credential"));
const config_1 = __importDefault(require("./config"));
class AccessKeyCredential extends default_credential_1.default {
    constructor(accessKeyId, accessKeySecret) {
        if (!accessKeyId) {
            throw new Error('Missing required accessKeyId option in config for access_key');
        }
        if (!accessKeySecret) {
            throw new Error('Missing required accessKeySecret option in config for access_key');
        }
        const conf = new config_1.default({
            type: 'access_key',
            accessKeyId,
            accessKeySecret
        });
        super(conf);
    }
}
exports.default = AccessKeyCredential;
//# sourceMappingURL=access_key_credential.js.map
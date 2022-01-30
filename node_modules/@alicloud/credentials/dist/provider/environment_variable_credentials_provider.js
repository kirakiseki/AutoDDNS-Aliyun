"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const access_key_credential_1 = __importDefault(require("../access_key_credential"));
exports.default = {
    getCredential() {
        const accessKeyId = process.env.ALIBABA_CLOUD_ACCESS_KEY_ID;
        const accessKeySecret = process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET;
        if (accessKeyId === undefined || accessKeySecret === undefined) {
            return null;
        }
        if (accessKeyId === null || accessKeyId === '') {
            throw new Error('Environment variable ALIBABA_CLOUD_ACCESS_KEY_ID cannot be empty');
        }
        if (accessKeySecret === null || accessKeySecret === '') {
            throw new Error('Environment variable ALIBABA_CLOUD_ACCESS_KEY_SECRET cannot be empty');
        }
        return new access_key_credential_1.default(accessKeyId, accessKeySecret);
    }
};
//# sourceMappingURL=environment_variable_credentials_provider.js.map
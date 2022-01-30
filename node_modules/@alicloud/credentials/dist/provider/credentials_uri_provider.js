"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uri_credential_1 = __importDefault(require("../uri_credential"));
exports.default = {
    getCredential() {
        const credentialsURI = process.env.ALIBABA_CLOUD_CREDENTIALS_URI;
        if (credentialsURI) {
            return new uri_credential_1.default(credentialsURI);
        }
        return null;
    }
};
//# sourceMappingURL=credentials_uri_provider.js.map
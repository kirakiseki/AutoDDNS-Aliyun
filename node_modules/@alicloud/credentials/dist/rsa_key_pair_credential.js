"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const session_credential_1 = __importDefault(require("./session_credential"));
const utils = __importStar(require("./util/utils"));
const http_1 = require("./util/http");
const config_1 = __importDefault(require("./config"));
const SECURITY_CRED_URL = 'http://100.100.100.200/latest/meta-data/ram/security-credentials/';
class RsaKeyPairCredential extends session_credential_1.default {
    constructor(publicKeyId, privateKeyFile) {
        if (!publicKeyId) {
            throw new Error('Missing required publicKeyId option in config for rsa_key_pair');
        }
        if (!privateKeyFile) {
            throw new Error('Missing required privateKeyFile option in config for rsa_key_pair');
        }
        if (!fs_1.default.existsSync(privateKeyFile)) {
            throw new Error(`privateKeyFile ${privateKeyFile} cannot be empty`);
        }
        const conf = new config_1.default({
            type: 'rsa_key_pair'
        });
        super(conf);
        this.privateKey = utils.parseFile(privateKeyFile);
        this.publicKeyId = publicKeyId;
    }
    async updateCredential() {
        const url = SECURITY_CRED_URL + this.roleName;
        const json = await http_1.request(url, {
            accessKeyId: this.publicKeyId,
            action: 'GenerateSessionAccessKey',
            durationSeconds: 3600,
            signatureMethod: 'SHA256withRSA',
            signatureType: 'PRIVATEKEY',
        }, {}, this.privateKey);
        this.sessionCredential = json.Credentials;
    }
}
exports.default = RsaKeyPairCredential;
//# sourceMappingURL=rsa_key_pair_credential.js.map
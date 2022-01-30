"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_credential_1 = __importDefault(require("./session_credential"));
const http_1 = require("./util/http");
const config_1 = __importDefault(require("./config"));
class RamRoleArnCredential extends session_credential_1.default {
    constructor(config, runtime = {}) {
        if (!config.accessKeyId) {
            throw new Error('Missing required accessKeyId option in config for ram_role_arn');
        }
        if (!config.accessKeySecret) {
            throw new Error('Missing required accessKeySecret option in config for ram_role_arn');
        }
        if (!config.roleArn) {
            throw new Error('Missing required roleArn option in config for ram_role_arn');
        }
        const conf = new config_1.default({
            type: 'ram_role_arn',
            accessKeyId: config.accessKeyId,
            accessKeySecret: config.accessKeySecret,
        });
        super(conf);
        this.roleArn = config.roleArn;
        this.policy = config.policy;
        this.durationSeconds = config.roleSessionExpiration || 3600;
        this.roleSessionName = config.roleSessionName || 'role_session_name';
        this.runtime = runtime;
        this.host = 'https://sts.aliyuncs.com';
    }
    async updateCredential() {
        const params = {
            accessKeyId: this.accessKeyId,
            roleArn: this.roleArn,
            action: 'AssumeRole',
            durationSeconds: this.durationSeconds,
            roleSessionName: this.roleSessionName
        };
        if (this.policy) {
            params.policy = this.policy;
        }
        const json = await http_1.request(this.host, params, this.runtime, this.accessKeySecret);
        this.sessionCredential = json.Credentials;
    }
}
exports.default = RamRoleArnCredential;
//# sourceMappingURL=ram_role_arn_credential.js.map
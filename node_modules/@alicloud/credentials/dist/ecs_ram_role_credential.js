"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_credential_1 = __importDefault(require("./session_credential"));
const httpx_1 = __importDefault(require("httpx"));
const config_1 = __importDefault(require("./config"));
const SECURITY_CRED_URL = 'http://100.100.100.200/latest/meta-data/ram/security-credentials/';
class EcsRamRoleCredential extends session_credential_1.default {
    constructor(roleName = '', runtime = {}) {
        const conf = new config_1.default({
            type: 'ecs_ram_role',
        });
        super(conf);
        this.roleName = roleName;
        this.runtime = runtime;
        this.sessionCredential = null;
    }
    async getBody(url) {
        const response = await httpx_1.default.request(url, {});
        return (await httpx_1.default.read(response, 'utf8'));
    }
    async updateCredential() {
        const roleName = await this.getRoleName();
        const url = SECURITY_CRED_URL + roleName;
        const body = await this.getBody(url);
        const json = JSON.parse(body);
        this.sessionCredential = {
            AccessKeyId: json.AccessKeyId,
            AccessKeySecret: json.AccessKeySecret,
            Expiration: json.Expiration,
            SecurityToken: json.SecurityToken,
        };
    }
    async getRoleName() {
        if (this.roleName && this.roleName.length) {
            return this.roleName;
        }
        return await this.getBody(SECURITY_CRED_URL);
    }
}
exports.default = EcsRamRoleCredential;
//# sourceMappingURL=ecs_ram_role_credential.js.map
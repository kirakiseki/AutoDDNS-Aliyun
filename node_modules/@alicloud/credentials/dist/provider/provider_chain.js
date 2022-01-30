"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentials = void 0;
const environment_variable_credentials_provider_1 = __importDefault(require("./environment_variable_credentials_provider"));
const profile_credentials_provider_1 = __importDefault(require("./profile_credentials_provider"));
const instance_ram_role_credentials_provider_1 = __importDefault(require("./instance_ram_role_credentials_provider"));
const credentials_uri_provider_1 = __importDefault(require("./credentials_uri_provider"));
const defaultProviders = [
    environment_variable_credentials_provider_1.default,
    profile_credentials_provider_1.default,
    instance_ram_role_credentials_provider_1.default,
    credentials_uri_provider_1.default
];
function getCredentials(providers = null) {
    const providerChain = providers || defaultProviders;
    for (const provider of providerChain) {
        const credential = provider.getCredential();
        if (credential) {
            return credential;
        }
    }
    return null;
}
exports.getCredentials = getCredentials;
//# sourceMappingURL=provider_chain.js.map
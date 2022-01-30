import DefaultCredential from './default_credential';
import Config from './config';
export default class SessionCredential extends DefaultCredential {
    sessionCredential: any;
    durationSeconds: number;
    constructor(config: Config);
    updateCredential(): Promise<void>;
    ensureCredential(): Promise<void>;
    getAccessKeyId(): Promise<any>;
    getAccessKeySecret(): Promise<any>;
    getSecurityToken(): Promise<any>;
    needUpdateCredential(): boolean;
}

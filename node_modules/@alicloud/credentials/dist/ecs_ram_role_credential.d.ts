import SessionCredential from './session_credential';
import ICredential from './icredential';
export default class EcsRamRoleCredential extends SessionCredential implements ICredential {
    roleName: string;
    runtime: {
        [key: string]: any;
    };
    constructor(roleName?: string, runtime?: {
        [key: string]: any;
    });
    getBody(url: string): Promise<string>;
    updateCredential(): Promise<void>;
    getRoleName(): Promise<string>;
}

import SessionCredential from './session_credential';
import Config from './config';
export default class RamRoleArnCredential extends SessionCredential {
    roleArn: string;
    policy: string;
    durationSeconds: number;
    roleSessionName: string;
    runtime: {
        [key: string]: any;
    };
    host: string;
    constructor(config: Config, runtime?: {
        [key: string]: any;
    });
    updateCredential(): Promise<void>;
}

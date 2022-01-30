import SessionCredential from './session_credential';
import ICredential from './icredential';
export default class RsaKeyPairCredential extends SessionCredential implements ICredential {
    privateKey: string;
    publicKeyId: string;
    roleName: string;
    constructor(publicKeyId: string, privateKeyFile: string);
    updateCredential(): Promise<void>;
}

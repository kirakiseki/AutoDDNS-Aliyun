import ICredential from './icredential';
import SessionCredential from './session_credential';
export default class URICredential extends SessionCredential implements ICredential {
    credentialsURI: string;
    constructor(uri: string);
    updateCredential(): Promise<void>;
}

import DefaultCredential from './default_credential';
import ICredential from './icredential';
export default class StsTokenCredential extends DefaultCredential implements ICredential {
    constructor(accessKeyId: string, accessKeySecret: string, securityToken: string);
}

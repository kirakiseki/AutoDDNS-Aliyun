import DefaultCredential from './default_credential';
import ICredential from './icredential';
export default class AccessKeyCredential extends DefaultCredential implements ICredential {
    constructor(accessKeyId: string, accessKeySecret: string);
}

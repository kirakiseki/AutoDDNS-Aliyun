import ICredential from '../icredential';
declare type IProvider = {
    getCredential: () => ICredential;
};
export declare function getCredentials(providers?: IProvider[]): ICredential;
export {};

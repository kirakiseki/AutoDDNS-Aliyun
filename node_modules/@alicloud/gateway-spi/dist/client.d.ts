/// <reference types="node" />
import Credential from '@alicloud/credentials';
import { Readable } from 'stream';
import * as $tea from '@alicloud/tea-typescript';
export declare class InterceptorContext extends $tea.Model {
    request: InterceptorContextRequest;
    configuration: InterceptorContextConfiguration;
    response: InterceptorContextResponse;
    static names(): {
        [key: string]: string;
    };
    static types(): {
        [key: string]: any;
    };
    constructor(map?: {
        [key: string]: any;
    });
}
export declare class AttributeMap extends $tea.Model {
    attributes: {
        [key: string]: any;
    };
    key: {
        [key: string]: string;
    };
    static names(): {
        [key: string]: string;
    };
    static types(): {
        [key: string]: any;
    };
    constructor(map?: {
        [key: string]: any;
    });
}
export declare class InterceptorContextRequest extends $tea.Model {
    headers?: {
        [key: string]: string;
    };
    query?: {
        [key: string]: string;
    };
    body?: any;
    stream?: Readable;
    hostMap?: {
        [key: string]: string;
    };
    pathname: string;
    productId: string;
    action: string;
    version: string;
    protocol: string;
    method: string;
    authType: string;
    bodyType: string;
    reqBodyType: string;
    style?: string;
    credential: Credential;
    signatureVersion?: string;
    signatureAlgorithm?: string;
    userAgent: string;
    static names(): {
        [key: string]: string;
    };
    static types(): {
        [key: string]: any;
    };
    constructor(map?: {
        [key: string]: any;
    });
}
export declare class InterceptorContextConfiguration extends $tea.Model {
    regionId: string;
    endpoint?: string;
    endpointRule?: string;
    endpointMap?: {
        [key: string]: string;
    };
    endpointType?: string;
    network?: string;
    suffix?: string;
    static names(): {
        [key: string]: string;
    };
    static types(): {
        [key: string]: any;
    };
    constructor(map?: {
        [key: string]: any;
    });
}
export declare class InterceptorContextResponse extends $tea.Model {
    statusCode?: number;
    headers?: {
        [key: string]: string;
    };
    body?: Readable;
    deserializedBody?: any;
    static names(): {
        [key: string]: string;
    };
    static types(): {
        [key: string]: any;
    };
    constructor(map?: {
        [key: string]: any;
    });
}
export default abstract class Client {
    constructor();
    abstract modifyConfiguration(context: InterceptorContext, attributeMap: AttributeMap): Promise<void>;
    abstract modifyRequest(context: InterceptorContext, attributeMap: AttributeMap): Promise<void>;
    abstract modifyResponse(context: InterceptorContext, attributeMap: AttributeMap): Promise<void>;
}

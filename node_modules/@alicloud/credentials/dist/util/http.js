"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const httpx_1 = __importDefault(require("httpx"));
const kitx = __importStar(require("kitx"));
const helper = __importStar(require("./helper"));
const utils = __importStar(require("./utils"));
const STATUS_CODE = new Set([200, '200', 'OK', 'Success']);
function firstLetterUpper(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}
function formatParams(params) {
    const keys = Object.keys(params);
    const newParams = {};
    for (const key of keys) {
        newParams[firstLetterUpper(key)] = params[key];
    }
    return newParams;
}
function encode(str) {
    const result = encodeURIComponent(str);
    return result.replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
}
function replaceRepeatList(target, key, repeat) {
    for (let i = 0; i < repeat.length; i++) {
        const item = repeat[i];
        if (item && typeof item === 'object') {
            const keys = Object.keys(item);
            for (const itemKey of keys) {
                target[`${key}.${i + 1}.${itemKey}`] = item[itemKey];
            }
        }
        else {
            target[`${key}.${i + 1}`] = item;
        }
    }
}
function flatParams(params) {
    const target = {};
    const keys = Object.keys(params);
    for (const key of keys) {
        const value = params[key];
        if (Array.isArray(value)) {
            replaceRepeatList(target, key, value);
        }
        else {
            target[key] = value;
        }
    }
    return target;
}
function normalize(params) {
    const list = [];
    const flated = flatParams(params);
    const keys = Object.keys(flated).sort();
    for (const key of keys) {
        const value = flated[key];
        list.push([encode(key), encode(value)]); // push []
    }
    return list;
}
function canonicalize(normalized) {
    const fields = [];
    for (const [key, value] of normalized) {
        fields.push(key + '=' + value);
    }
    return fields.join('&');
}
function _buildParams() {
    const defaultParams = {
        Format: 'JSON',
        SignatureMethod: 'HMAC-SHA1',
        SignatureNonce: kitx.makeNonce(),
        SignatureVersion: '1.0',
        Timestamp: utils.timestamp(),
        Version: '2015-04-01',
        RegionId: 'cn-hangzhou'
    };
    return defaultParams;
}
async function request(host, params = {}, opts = {}, accessKeySecret) {
    // 1. compose params and opts
    let options = Object.assign({ headers: {
            'x-sdk-client': helper.DEFAULT_CLIENT,
            'user-agent': helper.DEFAULT_UA
        } }, opts);
    // format params until formatParams is false
    if (options.formatParams !== false) {
        params = formatParams(params);
    }
    params = Object.assign(Object.assign({}, _buildParams()), params);
    // 2. calculate signature
    const method = (opts.method || 'GET').toUpperCase();
    const normalized = normalize(params);
    const canonicalized = canonicalize(normalized);
    // 2.1 get string to sign
    const stringToSign = `${method}&${encode('/')}&${encode(canonicalized)}`;
    // 2.2 get signature
    const key = accessKeySecret + '&';
    const signature = kitx.sha1(stringToSign, key, 'base64');
    // add signature
    normalized.push(['Signature', encode(signature)]);
    // 3. generate final url
    const url = opts.method === 'POST' ? `${host}/` : `${host}/?${canonicalize(normalized)}`;
    // 4. send request
    if (opts.method === 'POST') {
        opts.headers = opts.headers || {};
        opts.headers['content-type'] = 'application/x-www-form-urlencoded';
        opts.data = canonicalize(normalized);
    }
    const response = await httpx_1.default.request(url, opts);
    const buffer = await httpx_1.default.read(response, 'utf8');
    const json = JSON.parse(buffer);
    if (json.Code && !STATUS_CODE.has(json.Code)) {
        const err = new Error(`${json.Message}`);
        err.name = json.Code + 'Error';
        err.data = json;
        err.code = json.Code;
        err.url = url;
        throw err;
    }
    return json;
}
exports.request = request;
//# sourceMappingURL=http.js.map
// This file is auto-generated, don't edit it
/**
 * Get endpoint
 * @return string
 */
import { Readable } from 'stream';
import * as $tea from '@alicloud/tea-typescript';


export default class Client {

  static getEndpointRules(product: string, regionId: string, endpointType: string, network: string, suffix: string): string {
    let result;
    if (network && network.length && network != "public") {
      network = "-" + network;
    } else {
      network = "";
    }
    suffix = suffix || "";
    if (suffix.length) {
      suffix = "-" + suffix;
    }
    if (endpointType == "regional") {
      if (!regionId || !regionId.length) {
        throw new Error("RegionId is empty, please set a valid RegionId");
      }
      result = `${product}${suffix}${network}.${regionId}.aliyuncs.com`;
    } else {
      result = `${product}${suffix}${network}.aliyuncs.com`;
    }
    return result;
  }

}

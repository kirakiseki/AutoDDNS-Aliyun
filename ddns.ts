import Alidns20150109, * as $Alidns20150109 from '@alicloud/alidns20150109';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
const request = require('request');

const ipAPI = "https://api.ip138.com/ip/?datatype=jsonp&token=YOURTOKENHERE";
const AK = "YOURAK";
const SK = "YOURSK";
const domainName = "DOMAIN";
const RR = "RR";
const recordType = "A";

export default class Client {

    static async DescribeDomainRecords(client: Alidns20150109, domainName: string, RR: string, recordType: string): Promise<$Alidns20150109.DescribeDomainRecordsResponse> {
        let req = new $Alidns20150109.DescribeDomainRecordsRequest({});
        // 主域名
        req.domainName = domainName;
        // 主机记录
        req.RRKeyWord = RR;
        // 解析记录类型
        req.type = recordType;
        let resp = await client.describeDomainRecords(req);
        console.log("-------------------通过主域名、主机记录、记录类型进行搜索--------------------");
        return resp;
    }

    /**
     * 修改解析记录
     */
    static async UpdateDomainRecord(client: Alidns20150109, recordID: string, currentHostIP: string): Promise<void> {
        // 修改解析记录
        let req = new $Alidns20150109.UpdateDomainRecordRequest({});
        // 主机记录F
        req.RR = RR;
        // 记录ID
        req.recordId = recordID;
        // 将主机记录值改为当前主机IP
        req.value = currentHostIP;
        // 解析记录类型
        req.type = recordType;
        let resp = await client.updateDomainRecord(req);
        console.log("-------------------修改解析记录--------------------");
        console.log(`修改 recordID:${recordID} 的域名解析至 ${currentHostIP}, 解析类型为 ${recordType}。`)
    }


    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    static createClient(accessKeyId: string, accessKeySecret: string): Alidns20150109 {
        let config = new $OpenApi.Config({
            accessKeyId: AK,
            accessKeySecret: SK,
        });
        config.endpoint = `dns.aliyuncs.com`;
        return new Alidns20150109(config);
    }

    static async main(args: string[]): Promise<void> {
        let client = Client.createClient("accessKeyId", "accessKeySecret");
        let resp = await Client.DescribeDomainRecords(client, domainName, RR, recordType);
        let record = JSON.parse(JSON.stringify(resp.body.domainRecords)).record[0];
        console.log(`当前${RR+'.'+record.domainName}解析至${record.value}`);
        request(ipAPI, function (err: any, response: any, body: any) {
            let currentIP=JSON.parse(body).ip;
            if(currentIP!=record.value){
                console.log("当前域名解析地址与本机IP地址不同，将进行解析记录修改");
                Client.UpdateDomainRecord(client,record.recordId,currentIP);
            }
            else{
                console.log("当前域名解析地址与本机IP地址相同");
            }
        })
    }

}
Client.main(process.argv.slice(2));
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.getEndpointRules = function (product, regionId, endpointType, network, suffix) {
        var result;
        if (network && network.length && network != "public") {
            network = "-" + network;
        }
        else {
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
            result = "" + product + suffix + network + "." + regionId + ".aliyuncs.com";
        }
        else {
            result = "" + product + suffix + network + ".aliyuncs.com";
        }
        return result;
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=client.js.map
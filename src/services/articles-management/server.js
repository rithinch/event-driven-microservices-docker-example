require('dotenv').config();
const config = require("./environment/config");
const hostport = `${config.host}:${config.port}`;
const mali = require("mali");
const logger = require("mali-logger");
const SERVICE_INTERFACE_PROTO = "./service/definition.proto"
const articleManagementService = require("./service/implementation")

let server;

function main(){

    server = new mali(SERVICE_INTERFACE_PROTO);

    server.use({
        ArticleManagementService: articleManagementService
    });

    server.use(logger());

    server.start(hostport);
    console.log(`${server.name} is running on ${hostport}`);
}

main();
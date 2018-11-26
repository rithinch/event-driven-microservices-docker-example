let config = {
    name: "Article Management Service",
    baseAPIRoute: "api",
    port: process.env.PORT,
    host: process.env.HOST,
    messagebus: process.env.MESSAGE_BUS,
    environment: process.env.ENVIRONMENT,
    db: {
        uri: "mongodb://chalumuv-localnewsapplication.documents.azure.com:10255/?ssl=true&replicaSet=globaldb",
        username: "chalumuv-localnewsapplication",
        password: "TlJ7hnd7iRck25fUFFWYgfJFdK2oSH1N2kbBQjFzb66nqFx486JP6eaCKAQrlyn3Cnwxn6MzJtF5ABeyN9CKYQ=="
    },
    services:{
        mediaManagement: process.env.MEDIA_MANAGEMENT_SERVICE_URI
    }
};

module.exports = config;


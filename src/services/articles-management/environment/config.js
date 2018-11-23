let config = {
    name: "Article Management Service",
    port: process.env.PORT,
    host: process.env.HOST,
    messagebus: process.env.MESSAGE_BUS,
    environment: process.env.ENVIRONMENT,
    db: {
        dbConnectionString: "mongodb://chalumuv-localnewsapplication:TlJ7hnd7iRck25fUFFWYgfJFdK2oSH1N2kbBQjFzb66nqFx486JP6eaCKAQrlyn3Cnwxn6MzJtF5ABeyN9CKYQ==@chalumuv-localnewsapplication.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
    },
    services:{
        authentication: process.env.AUTHENTICATION_SERVICE,
        mediaManagement: process.env.MEDIA_MANAGEMENT_SERVICE
    }
};

module.exports = config;


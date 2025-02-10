import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    mongo_uri_dev: process.env.MONGO_URI_DEV,
    mongo_uri_test: process.env.MONGO_URI_TEST,
    jwt_secret: process.env.JWT_SECRET,
    serverHttp: process.env.SERVER_HTTP,
};


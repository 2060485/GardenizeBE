import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import { config } from './config/config';

const app = express();
const corsOptions = {
    origin: ['http://localhost:4000',],
}

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

export default app;

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/config';
import plantRoutes from './routes/plant.route';

const app = express();
const corsOptions = {
    origin: ['http://localhost:3000',],
}

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use('/plants', plantRoutes);

export default app;

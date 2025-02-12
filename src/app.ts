import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import { config } from './config/config';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route'

const app = express();
const corsOptions = {
    origin: ['http://localhost:3000',],
}

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use('/api',userRoutes)
app.use('/api',authRoutes)

export default app;

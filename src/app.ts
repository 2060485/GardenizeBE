import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/config';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route'
import plantRoutes from './routes/plant.route';


const app = express();
const corsOptions = {
    origin: ['https://gardenizefe.onrender.com/',],
}

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use('/api',userRoutes)
app.use('/api',authRoutes)
app.use('/plants', plantRoutes);

export default app;

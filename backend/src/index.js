import express from 'express';
import 'dotenv/config';
import { connectDb } from './lib/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('server is working');
});

app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
    connectDb();
});
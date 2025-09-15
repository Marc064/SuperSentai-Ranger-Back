import express from 'express';
import cors from 'cors';
import tokusatsuRouter from './router/tokusatsuRouter';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/tokusatsu', tokusatsuRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
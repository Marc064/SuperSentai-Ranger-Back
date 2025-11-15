import express from 'express';
import cors from 'cors';
import sagaRouter from './router/sagaRouter';
import temporadaRouter from './router/temporadaRouter';
import tematicaRouter from './router/tematicaRouter';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/tokusatsu/saga', sagaRouter);
app.use('/api/tokusatsu/temporada', temporadaRouter);
app.use('/api/tokusatsu/tematica', tematicaRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
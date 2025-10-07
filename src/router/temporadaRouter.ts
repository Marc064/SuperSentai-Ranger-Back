import express from 'express';
import {
    getTemporadasByIdSaga
} from '../controller/temporadaController';

const router = express.Router();

// Temporada Routes
router.get('/:idSaga', async (req, res) => {
    const { idSaga } = req.params;
    try {
        const temporada = await getTemporadasByIdSaga(Number(idSaga));
        res.status(temporada.length ? 200 : 404).json(temporada.length ? temporada : { error: 'Not Found' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
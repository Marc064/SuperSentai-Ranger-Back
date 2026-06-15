import express from 'express';
import {
    getTemporadasByIdSaga,
    saveTemporada,
    updateTemporada,
    updateLinkVideo,
    updateVisto,
    updateDuracionVisto,
    deleteTemporada,
} from '../controller/temporadaController';

const router = express.Router();

router.get('/:idSaga', async (req, res) => {
    const { idSaga } = req.params;
    try {
        const temporadas = await getTemporadasByIdSaga(Number(idSaga));
        res
            .status(temporadas.length ? 200 : 404)
            .json(temporadas.length ? temporadas : { error: 'No se encontraron temporadas' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevaTemporada = await saveTemporada(req.body);
        res.status(201).json(nuevaTemporada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la temporada' });
    }
});

router.put('/:idTemporada', async (req, res) => {
    const { idTemporada } = req.params;
    try {
        const temporadaActualizada = await updateTemporada(Number(idTemporada), req.body);
        res.json(temporadaActualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la temporada' });
    }
});

router.patch('/link/:idTemporada', async (req, res) => {
    const { idTemporada } = req.params;
    const { link } = req.body;
    try {
        const temporada = await updateLinkVideo(Number(idTemporada), link);
        res.json(temporada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el link del video' });
    }
});

router.patch('/visto/:idTemporada', async (req, res) => {
    const { idTemporada } = req.params;
    const { visto } = req.body;
    try {
        const temporada = await updateVisto(Number(idTemporada), Number(visto));
        res.json(temporada);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.patch('/duracion/:idTemporada', async (req, res) => {
    const { idTemporada } = req.params;
    const { duracionVisto } = req.body;
    try {
        const temporada = await updateDuracionVisto(Number(idTemporada), duracionVisto);
        res.json(temporada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la duración vista' });
    }
});

router.delete('/:idTemporada', async (req, res) => {
    const { idTemporada } = req.params;
    try {
        await deleteTemporada(Number(idTemporada));
        res.json({ message: 'Temporada eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la temporada' });
    }
});

export default router;

import express from 'express';
import {
    getAllTematicas,
    saveTematica,
    updateTematica,
    deleteTematica
} from '../controller/tematicaController';

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const tematicas = await getAllTematicas();
        res.json(tematicas);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tematicas' });
    }
});

router.post('/', async (req, res) => {
    const tematicaData = req.body;
    try {
        const newTematica = await saveTematica(tematicaData);
        res.status(201).json(newTematica);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save tematica' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const tematicaData = req.body;
    try {
        const updatedTematica = await updateTematica(Number(id), tematicaData);
        res.json(updatedTematica);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update tematica' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteTematica(Number(id));
        res.status(204).json({ message: 'Tematica deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tematica' });
    }
});

export default router;
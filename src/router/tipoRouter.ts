import express from 'express';
import {
    getAllTipos,
    findById,
    saveTipo,
    updateTipo,
    deleteTipo
} from '../controller/tipoController';

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const tipos = await getAllTipos();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tipos' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const tipo = await findById(Number(id));
        res.json(tipo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tipos' });
    }
});

router.post('/', async (req, res) => {
    const tipoData = req.body;
    try {
        const newTipo = await saveTipo(tipoData);
        res.status(201).json(newTipo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save tipo' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const tipoData = req.body;
    try {
        const updatedTipo = await updateTipo(Number(id), tipoData);
        res.json(updatedTipo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update tipo' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteTipo(Number(id));
        res.status(204).json({ message: 'Tipo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tipo' });
    }
});

export default router;
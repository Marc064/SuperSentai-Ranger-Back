import express from "express";
import {
    getAllSagas,
    getSagaByName,
    saveSaga,
    updateSaga
} from "../controller/sagaController";

const router = express.Router();

// Saga Routes
router.get("/", async (_req, res) => {
    try {
        const sagas = await getAllSagas();
        res.status(200).json(sagas);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const type = await getSagaByName(name.toUpperCase());
        res.status(type ? 200 : 404).json(type ? type : { error: "Not Found" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    const sagaData = req.body;
    try {
        const newSaga = await saveSaga(sagaData);
        res.status(201).json(newSaga);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }   
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const sagaData = req.body;
    try {
        const updatedSaga = await updateSaga(Number(id), sagaData);
        res.status(200).json(updatedSaga);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
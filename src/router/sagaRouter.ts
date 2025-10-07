import express from "express";
import {
    getAllSagas,
    getSagaByName
} from "../controller/sagaController";

const router = express.Router();

// Saga Routes
router.get("/", async (_req, res) => {
    try {
        const types = await getAllSagas();
        res.status(200).json(types);
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


export default router;
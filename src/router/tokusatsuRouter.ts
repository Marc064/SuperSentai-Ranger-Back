import express from "express";
import { getAllSagas } from "../controller/tokusatsuController";

const router = express.Router();

router.get("/sagas", async (_req, res) => {
    try {
        const types = await getAllSagas();
        res.json(types);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
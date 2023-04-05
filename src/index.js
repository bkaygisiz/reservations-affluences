import express from "express";
import { isReservation } from "./controller/controller.js";
const app = express();

app.get("/api/reservations", async (req, res) => {
    const result = await isReservation(req, res);
    res.json(result);
});

app.listen(3000, () => console.log("Listening on port 3000!"))
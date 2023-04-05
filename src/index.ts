import * as express from "express";
import { isReservation } from "./controller/controller.js";
import { Request, Response } from "express";
import { Message } from "./interfaces";
const app = express();

app.get("/api/reservations", async (req: Request, res: Response) => {
    const result: Message = await isReservation(req, res);
    res.json(result);
});

app.listen(3000, () => console.log("Listening on port 3000!"))
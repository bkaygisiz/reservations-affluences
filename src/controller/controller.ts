import { isAvailable } from "../model/model.js";
import { Request, Response } from "express";
import { Message } from "../interfaces";

export async function isReservation(req: Request, _res: Response): Promise<Message> {
    const date: string = req.query.date as string;
    const resourceId: string = req.query.resourceId as string;
    const result = await isAvailable(date, resourceId);
    console.log(result)
    const msg: Message = {
        'available': result
    }
    return msg;
}

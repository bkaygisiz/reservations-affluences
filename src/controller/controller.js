import { isAvailable } from "../model/model.js";

export async function isReservation(req, _res) {
    const { date, resourceId } = req.query;
    const result = await isAvailable(date, resourceId);
    const msg = {
        'available': result
    }
    return msg;
}

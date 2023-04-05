import axios from "axios";
import { Reservation } from "../interfaces";

export async function isAvailable(date, resourceId): Promise<boolean> {
    let isReserved: boolean = true;
    let isOpen: boolean = false;
    let res: boolean = false;
    const onlyDate: string = date.split("T")[0];
    const time: string = date.split("T")[1];
    const { data } = await axios.get(`http://localhost:8080/reservations?date=${onlyDate}&resourceId=${resourceId}`);
    const timetablesData  = (await axios.get(`http://localhost:8080/timetables?date=${onlyDate}&resourceId=${resourceId}`)).data;
    console.log(timetablesData);
    console.log(data);
    const reservationsStart: string[] = data.reservations.map((reservation: Reservation) => {
        return (reservation.reservationStart.split(' ')[1])
    });
    const reservationsEnd: string[] = data.reservations.map((reservation: Reservation) => {
        return (reservation.reservationEnd.split(' ')[1])
    });
    const timetableStart: String[] = timetablesData.timetables.map((timetable: any) => {
        return (timetable.opening.split(' ')[1])
    });
    const timetableEnd: String[] = timetablesData.timetables.map((timetable: any) => {
        return (timetable.closing.split(' ')[1])
    });
    for (let i: number = 0; i < reservationsStart.length; i++) {
        if (time >= reservationsStart[i] && time <= reservationsEnd[i]) {
            isReserved = false;
        }
    }
    for (let i: number = 0; i < timetableStart.length; i++) {
        if (time >= timetableStart[i] && time <= timetableEnd[i]) {
            isOpen = true;
            break;
        }
    }
    
    if (isOpen && isReserved) {
        res = true;
    }
    return res;
}
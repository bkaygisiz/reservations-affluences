import axios from "axios";

export async function isAvailable(date, resourceId) {
    const onlyDate = date.split("T")[0];
    const time = date.split("T")[1];
    const { data } = await axios.get(`http://localhost:8080/reservations?date=${onlyDate}&resourceId=${resourceId}`);
    const reservationsStart = data.reservations.map((reservation) => {
        return (reservation.reservationStart.split(' ')[1])
    });
    const reservationsEnd = data.reservations.map((reservation) => {
        return (reservation.reservationEnd.split(' ')[1])
    });
    for (let i = 0; i < reservationsStart.length; i++) {
        if (time >= reservationsStart[i] && time <= reservationsEnd[i]) {
            return false;
        }
    }
    return true;
}
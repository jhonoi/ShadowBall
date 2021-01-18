function CalFunc(mon) {
    const dates = [
        [],
        [],
        [],
        [],
        [],
        []
    ]

    let date = new Date();
    let z = 0;

    const days = function (month, year) { //Gets the num of days in month
        return new Date(year, month, 0).getDate();
    };

    for (var x = 1; x <= days(mon.dayss, date.getFullYear()); x++) {

        let dayofW = new Date(date.getFullYear(), mon.dayofW, x).getDay();
        if (x === 1 && dayofW !== 0) {
            let prevMonth = days(mon.dayss === 0 ? mon.dayss - 2 : mon.dayss - 1, date.getFullYear());
            prevMonth = prevMonth - (dayofW);
            for (var i = 0; i < dayofW; i++) {
                prevMonth++;
                dates[z][i] = prevMonth;
            }
        }

        dates[z][dayofW] = x;

        if (x === days(mon.dayss, date.getFullYear())) {
            let nxtDays = 1;
            for (var c = dayofW + 1; c < 7; c++) {

                dates[z][c] = nxtDays;
                nxtDays++;
            }
        }
        if (dayofW === 6) {
            z++;
        }

    }
    return dates
}

export default CalFunc
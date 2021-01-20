import {useState} from "react"
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
                dates[z][i] = prevMonth.toString();
            }
        }

        dates[z][dayofW] = x;

        if (x === days(mon.dayss, date.getFullYear())) {
            let nxtDays = 1;
            for (var c = dayofW + 1; c < 7; c++) {

                dates[z][c] = nxtDays.toString();
                nxtDays++;
            }
        }
        if (dayofW === 6) {
            z++;
        }

    }
    return dates
}
function WeekFunc(mon){
    

    let dates=CalFunc(mon);
    let currDay=new Date().getDate();
    let currweek; //holds index of the week we want
    function Checkweek(day) {
        return day === currDay;
      }
      
    for(var x=0;x<dates.length;x++)
    {
        
        if(dates[x].findIndex(Checkweek)>-1)
        {
            currweek=x;
        }
        
    }
    return dates[currweek];
}

export default CalFunc
export {WeekFunc}
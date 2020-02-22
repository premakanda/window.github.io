function timer() {

    function checkZero(int) {
        if (int <= 0) {
        int = "00";
        } else if (int < 10 && int > 0) {
        int = "0" + int;
        } else {
        int = int;
        }
        return `${int}`;
    }

    let date = new Date(),
        deadline = "2019/7/4";

    function getTimeRemaning(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / 1000 / 60) % 60),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        days = Math.floor(t / (1000 * 60 * 60 * 24));

        return {
        total: t,
        hours: checkZero(hours),
        minutes: checkZero(minutes),
        seconds: checkZero(seconds),
        days: checkZero(days)
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
        days = timer.querySelector(".days"),
        hours = timer.querySelector(".hours"),
        minutes = timer.querySelector(".minutes"),
        seconds = timer.querySelector(".seconds"),
        timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
        let t = getTimeRemaning(endtime);
        if (t.days.length > 2) {
            days.innerHTML = `<div>${t.days[0]}</div><div>${t.days[1]}</div><div>${
            t.days[2]
            }</div>`;
        } else {
            days.innerHTML = `<div>${t.days[0]}</div><div>${t.days[1]}</div>`;
        }
        hours.innerHTML = `<div>${t.hours[0]}</div><div>${t.hours[1]}</div>`;
        minutes.innerHTML = `<div>${t.minutes[0]}</div><div>${
            t.minutes[1]
        }</div>`;
        seconds.innerHTML = `<div>${t.seconds[0]}</div><div>${
            t.seconds[1]
        }</div>`;

        if (t.total < 0) {
            clearInterval(timeInterval);
        }
        }
    }

    setClock("timer", deadline);
}

export default timer;
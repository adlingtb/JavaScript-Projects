const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

setInterval(updateCountdown, 1000);

function updateCountdown(){

    const currentDate = new Date();
    const birthdayDate = new Date("22 July 2022");   

    const totalSecs = Math.floor((birthdayDate - currentDate) /1000);

    const seconds = totalSecs % 60 ;
    const minutes = Math.floor(totalSecs /60 % 60);
    const hours = Math.floor(totalSecs /3600 % 24);
    const days = Math.floor(totalSecs /86400 %365);
    
    daysEl.innerText = days;
    hoursEl.innerText = hours;
    minutesEl.innerText = minutes;
    secondsEl.innerText = seconds;
    
}


//TODO: Add 0 before 1-9, Add date picker, Store favourite dates in localstorage, Add multiple countdowns,
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

setInterval(updateCountdown, 1000);

function updateCountdown(){

    const currentDate = new Date();
    const targetDate = new Date(document.getElementById("date").value);   

    const totalSecs = Math.floor((targetDate - currentDate) /1000);

    const seconds = totalSecs % 60 ;
    const minutes = Math.floor(totalSecs /60 % 60);
    const hours = Math.floor(totalSecs /3600 % 24);
    const days = Math.floor(totalSecs /86400 %365);
    
    if(days < 10 && days > 0){
        daysEl.innerText = `0${days}`;
    }else{
        daysEl.innerText = days;        
    }
    if(hours < 10 && hours > 0){
        hoursEl.innerText = `0${hours}`;
    }else{
        hoursEl.innerText = hours;        
    }
    if(minutes < 10 && minutes > 0){
        minutesEl.innerText = `0${minutes}`;
    }else{
        minutesEl.innerText = minutes;        
    }
    if(seconds < 10 && seconds > 0){
        secondsEl.innerText = `0${seconds}`;
    }else{
        secondsEl.innerText = seconds;        
    }
    
}


//TODO: Store favourite dates in localstorage, Add multiple countdowns,
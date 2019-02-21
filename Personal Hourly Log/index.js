let currentHours, currentMinutes, currentSeconds;
localStorage.getItem("currentHours") !== undefined ? currentHours = parseInt(localStorage.getItem("currentHours")) : currentHours = 0;
localStorage.getItem("currentMinutes") !== undefined ? currentMinutes = parseInt(localStorage.getItem("currentMinutes")) : currentMinutes = 0;
localStorage.getItem("currentSeconds") !== undefined ? currentSeconds = parseInt(localStorage.getItem("currentSeconds")) : currentSeconds = 0;

/*
if(typeof(Storage) !== "undefined"){
    currentHours = localStorage.getItem("currentHours");
    currentMinutes = localStorage.getItem("currentMinutes");
    currentSeconds = localStorage.getItem("currentSeconds");
}else{
    console.log("Your Browser Doesn't Support Web Storage.");
}
*/

document.querySelector('#reset').addEventListener('click', ()=>{
    currentHours = 0;
    currentMinutes = 0;
    currentSeconds = 0;
    displayTime();
});

document.querySelector('#timeSubmit').addEventListener('click', ()=>{
    try{
        let input, hours, minutes;
        input = document.querySelector('#timeInput').value;
        input = input.split(':');
        if(input.length === 1){return;}
        if(input.length >= 3){return;}
        minutes = input[0];
        seconds = input[1];
        console.log(document.querySelector('#dropdown').value);
        if(document.querySelector('#dropdown').value === '+'){
            currentMinutes += parseInt(minutes);
            currentSeconds += parseInt(seconds);
        }else{
            currentMinutes -= parseInt(minutes);
            currentSeconds -= parseInt(seconds);
        }
        calculateTime();
        displayTime();
    }catch(error){
        console.log(error);
    }
    
});

let calculateTime = () => {
    setToZero();
    while(currentSeconds >= 60){
        currentMinutes += 1;
        currentSeconds -= 60;
    }
    while(currentMinutes >= 60){
        currentHours += 1;
        currentMinutes -= 60;
    }
    setToZero();
}

let displayTime = () => {
    if(typeof(Storage) !== "undefined"){
        localStorage.setItem("currentHours", currentHours);
        localStorage.setItem("currentMinutes", currentMinutes);
        localStorage.setItem("currentSeconds", currentSeconds);
    }else{
        console.log("Your Browser Doesn't Support Web Storage.");
    }
    document.querySelector('#hoursResult').textContent = `Hours: ${currentHours}`;
    document.querySelector('#minutesResult').textContent = `Minutes: ${currentMinutes}`;
    document.querySelector('#secondsResult').textContent = `Seconds: ${currentSeconds}`;
}

let setToZero = () => {
    if(currentHours < 0){currentHours = 0}
    if(currentMinutes < 0){currentMinutes = 0}
    if(currentSeconds < 0){currentSeconds = 0}
}

displayTime();
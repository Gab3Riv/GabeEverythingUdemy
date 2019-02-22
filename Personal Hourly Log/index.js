let currentHours, currentMinutes, currentSeconds;
localStorage.getItem("currentHours") !== "NaN"  ? currentHours = parseInt(localStorage.getItem("currentHours")) : currentHours = 0;
localStorage.getItem("currentMinutes") !== "NaN" ? currentMinutes = parseInt(localStorage.getItem("currentMinutes")) : currentMinutes = 0;
localStorage.getItem("currentSeconds") !== "NaN"  ? currentSeconds = parseInt(localStorage.getItem("currentSeconds")) : currentSeconds = 0;

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
            calculateTimePositive();
        }else{
            calculcateTimeNegative(parseInt(minutes), parseInt(seconds));
        }
        displayTime();
    }catch(error){
        console.log(error);
    }  
});

let calculcateTimeNegative = (tempMinutes, tempSeconds) => {
    let tempHours = 0; //0:90:0 --> 1:30:0   Total Time: 8:00:00 --> 6:30:00
                        //0:0:21 --> 0:0:21  Total Time: 0:01:20 --> 0:00:59
    while(tempSeconds >= 60){
        tempMinutes += 1;
        tempSeconds -= 60;
    }
    while(tempMinutes >= 60){
        tempHours += 1;
        tempMinutes -= 60;
    }
    currentHours -= tempHours;
    if(currentHours < 0){
        setEverythingToZero();
        return;
    }
    currentMinutes -= tempMinutes;
    while(currentMinutes < 0){
        if(currentHours > 1){
            currentHours -= 1;
            currentMinutes += 60;
        }else{
            setEverythingToZero();
        }
    }
    currentSeconds -= tempSeconds;
    while(currentSeconds < 0){
        if(currentMinutes > 1){
            currentMinutes -= 1;
            currentSeconds += 60;
        }else{
            setEverythingToZero();
        }
    }
}

let setEverythingToZero = () => {
    currentHours = 0;
    currentMinutes = 0;
    currentSeconds = 0;
}

let calculateTimePositive = () => {
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
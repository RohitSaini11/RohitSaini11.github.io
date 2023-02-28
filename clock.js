(function (){
        
let alarms = [];

let selects = document.querySelectorAll('select');
let currentTime= document.getElementById('current-time');
let alarmBtn = document.getElementById('alarm-btn')
let alarmList = document.getElementById('alarm-list');
let deletebtn = document.getElementsByTagName('img');
let alarmTime;


//the following loops are used to limit options in select for eg: hours = 0 to 12 
for( let i = 12 ; i >=0 ; i-- ){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selects[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for( let i = 59; i >=0 ; i-- ){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selects[1].firstElementChild.insertAdjacentHTML("afterend", option);
    selects[2].firstElementChild.insertAdjacentHTML("afterend", option);
}
for( let i= 2 ; i > 0 ;i-- ){
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selects[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(()=>{   // set interval to make the clock show the current time

    for(let i = 0 ; i<alarms.length ; i++){
        alarmTime =  `${alarms[i].hh}:${alarms[i].mm}:${alarms[i].ss} ${alarms[i].ampm}`;
        if(alarmTime == getCurrentTime()){
            showNotification("Ringing...");
        }
    }
    currentTime.innerText = getCurrentTime();

}, 1000);

// gives the current time for the clock
function getCurrentTime(){
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if(h >= 12){
        h = h - 12;
        ampm = "PM";
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    let time = `${h}:${m}:${s} ${ampm}`;
    return time;
}


function setAlarm(){
    if(selects[0].value == "Hours" ||selects[1].value == "Minutes" ||selects[2].value == "Seconds" ||selects[3].value == "AM/PM" ){
        showNotification("Please Enter Alarm Properly!!");
        return;
    }

    const time = {
        id : Date.now(),
        hh : selects[0].value,
        mm : selects[1].value,
        ss : selects[2].value,
        ampm : selects[3].value
    }
    addAlarm(time);
    
}

function addAlarmToDOM(list){
    const li=document.createElement('li');
    li.innerHTML=` 
                <p>${list.hh}:${list.mm}:${list.ss} ${list.ampm}</p>
                <img class="delete" src="delete.png" data-id="${list.id}"> 
            `;
    alarmList.append(li);
}

function renderList(){
    alarmList.innerHTML='';
    for(let i=0;i<alarms.length;i++){
        addAlarmToDOM(alarms[i]);
    }
}

function addAlarm(time){
    alarms.push(time);
    renderList();
}

function deleteAlarm(id){
    
    const newalarms = alarms.filter(function (alarm){
        return alarm.id != Number(id);
    });
    alarms=newalarms;
    renderList();
    // showNotification("Alarm removed successfully");
}

function showNotification(text){
    alert(text);
}

function handleClicks(e){
    const target=e.target;
    console.log(target);
    if(target.className ==='delete'){
        const id=target.dataset.id;
        deleteAlarm(id);
        return ;
    }
    else if(target.className === 'alarm-btn'){
        setAlarm();
        return;
    }
}

document.addEventListener('click',handleClicks);
})();
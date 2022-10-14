let locationEl = document.querySelector(".location")
var switchBtn = document.getElementById("switch")
let a = document.getElementById("a")
let temp = document.getElementById("degrees")
let time = document.getElementById("time")
let content = document.getElementById("content")

const kelvin = 273
let img = document.getElementById("img")
let desc = document.getElementById("desc")


function darkMode() {
    let element = document.body
    element.classList.toggle('dark-mode')
    content.classList.toggle('dark-mode-content')
    switchBtn.classList.toggle('dark-mode-switch')
}

let locations = ["London", "Istanbul", "Paris","Madrid", "Rome"]
let CurrentLocaction = ""
let count = 0

CurrentLocaction = locations[count]


function changeLocation() {
    CurrentLocaction = locations[count]
    count++
    if (count == locations.length) {
        count = 0
    }

    return CurrentLocaction
}

function switchLocation() {
    locationEl.textContent = changeLocation()
    weather()
        
    time.textContent = returnTime() + " | " + ReturnDate()
}


CurrentLocaction = changeLocation()

console.log(CurrentLocaction)




function ReturnDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    return currentDate
}







function changeTimeZone(date, timeZone) {
    if (typeof date === 'string') {
        return new Date(
        new Date(date).toLocaleString('en-US', {
            timeZone,
        }),
        );
    }
    
    return new Date(  
        date.toLocaleString('en-US', {
        timeZone,
        }),
    );
}


function returnTime() {
    let NewTime= changeTimeZone(new Date(), 'Europe/'+CurrentLocaction)
    let hour = NewTime.getHours() 
    let min = NewTime.getMinutes()
    let sec = NewTime.getSeconds()
    if (min < 10){
        min = '0' + min
    }
    let currentTime = hour + ":" + min 
    return currentTime
        


}









function weather(name){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+CurrentLocaction+'&appid=50a7aa80fa492fa92e874d23ad061374')
    .then(response => response.json())
    .then(data => {
    var tempValue = data['main']['temp'];
    var nameValue = data['name'];
    var descValue = data['weather'][0]['description'];
    let icon1 = data.weather[0].icon;

    desc.textContent = descValue

    tempValue =  Math.floor(tempValue - kelvin) + "°C" 
    
    temp.textContent = tempValue;
    
    if (descValue == "clear sky"){
        img.innerHTML = `<img src="./Sunny.png" alt = "Sorry Coulndt find the image" style = "width: 250px;"/>`
    }
    else if (descValue == "broken clouds" || descValue == "scattered clouds" || descValue == "overcast clouds") {
        img.innerHTML = `<img src="./Cloudy.png" alt = "Sorry Coulndt find the image" style = "width: 250px;"/>`
    }
    else if (descValue == "moderate rain") {
        img.innerHTML = `<img src="./Rainy.png" alt = "Sorry Coulndt find the image" style = "width: 250px;"/>`
    }  else if (descValue == "light rain") {
        img.innerHTML = `<img src="./Rainy.png" alt = "Sorry Coulndt find the image" style = "width: 250px;"/>`
    }

    })
    
}

    



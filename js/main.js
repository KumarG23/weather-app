import axios from "axios";

//declarations
const APIKey = "da140f769044871b7d5db8ca57226465";
const weatherForm = document.querySelector(".weatherForm");
const zipInput = document.querySelector(".zipInput");
let card = document.querySelector(".card");
let country = "us";
let temperature = document.querySelector(".temperature");
let condition = document.querySelector(".condition");
let other = document.querySelector(".other");
let cityContainer = document.getElementById("cityContainer");
let tempContainer = document.getElementById("tempContainer");
let condContainer = document.getElementById("condContainer");
let otherContainer = document.getElementById("otherContainer");




//weather form
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const zip = zipInput.value;

  if (zip) {
    try {
      const weatherData = await getWeatherData(zip);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please Enter Zip Code");
  }
});



//get data with api
async function getWeatherData(zip) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${APIKey}`;

  const response = await fetch(apiURL);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}
let cityLabel;
let tempLabel;
let condLabel;
//display data
function displayWeatherInfo(data) {
  console.log(data);
  const {
    name: city, //what we are fetching from api arrays
    main: {temp},
    weather: [{ description, id, icon}],
  } = data;

//text content / displays n/a
  //card.textContent = "City";
  //card.style.display = "";
  //temperature.textContent = "";
  //tempLabel.textContent = "Temperature";
  //temperature.style.display = "";
  //condition.textContent = "Condition";
  //condition.style.display = "";
  //other.textContent = "Other Info";
  //other.style.display = "";

// create elements
  let cityDisplay = document.createElement("p");
  //let tempLabel = document.createElement("p");
  let tempDisplay = document.createElement("p");
  let tempFarDisplay = document.createElement("p");
  let tempCelDisplay = document.createElement("p");
  //let humidityDisplay = document.createElement("p");
  let descDisplay = document.createElement("p");
  let weatherEmoji = document.createElement("img");
  
  // give the created elements data
  cityDisplay.textContent = city;
  tempDisplay.textContent = `${temp} K`;
  tempFarDisplay.textContent = `${(((temp - 273.15) * 9) / 5 + 32).toFixed(1)}°F`;
  tempCelDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  //humidityDisplay.textContent = `${humidity} Humidity`;
  descDisplay.textContent = description;
//   weatherEmoji.textContent = getWeatherEmoji(id);
//   weatherEmoji.src=`https://openweathermap.org/img/wn/${icon}`
  weatherEmoji.src=`https://openweathermap.org/img/wn/${icon}@2x.png`
  

  //give created elements a class for styling
  cityDisplay.classList.add("cityDisplay");
  //tempLabel.classList.add("tempLabel");
  tempDisplay.classList.add("tempDisplay");
  tempFarDisplay.classList.add("tempFarDisplay");
  tempCelDisplay.classList.add("tempCelDisplay");
  //humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");


  //append created elements to parent
  cityLabel = document.createElement("p");
  cityLabel.textContent = "City";
  cityLabel.classList.add("cityLabel");
  cityLabel.appendChild(card);
  tempLabel = document.createElement("p");
  tempLabel.textContent ="Temperature";
  tempLabel.classList.add("tempLabel");
  card.appendChild(cityDisplay);
  //temperature.appendChild(tempLabel);
  temperature.appendChild(tempDisplay);
  temperature.appendChild(tempFarDisplay);
  temperature.appendChild(tempCelDisplay);
  //condition.appendChild(humidityDisplay, "p");
  condLabel = document.createElement("p");
  condLabel.textContent = "Condition";
  condLabel.classList.add("condLabel");
  condition.appendChild(descDisplay);
  other.appendChild(weatherEmoji);

  
  cityContainer.appendChild(cityLabel);
  cityContainer.appendChild(card);
  tempContainer.appendChild(tempLabel);
  tempContainer.appendChild(temperature);
  condContainer.appendChild(condLabel);
  condContainer.appendChild(condition);
  otherContainer.appendChild(other);
}



// async function getWeatherEmoji(weatherId) {
//   weatherEmoji.src = `https://openweathermap.org/img/wn/${weatherId}`;
//   weatherEmoji.alt = description;

//   const response = await fetch(weatherEmoji.src);

//   switch (true) {
//     case weatherId >= 200 && weatherId < 300:
//       return await response.json(wapiURL);
//       break;
//     case weatherId >= 300 && weatherId < 400:
//       return await response.json(wapiURL);
//       break;
//     case weatherId >= 400 && weatherId < 500:
//       return await response.json(wapiURL);
//       break;
//     case weatherId >= 500 && weatherId < 600:
//       return await response.json(wapiURL);
//       break;
//     case weatherId >= 600 && weatherId < 700:
//       return await response.json(wapiURL);
//       break;
//     case weatherId >= 700 && weatherId < 800:
//       return await response.json(wapiURL);
//       break;
//     case weatherId >= 800 && weatherId <= 804:
//       return await response.json(wapiURL);
//       break;
//   }
// }

//error display
function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

/* function swanson () {
    axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes/1')
    .then(response => console.log('data ', response.data))
    .catch(error => {
        console.log('error: ', error)
    })
}

swanson()

function swanson () {
    fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes/1')
    .then(response => response.json())
    .then(data => console.log('data ', data))
    .catch(error => {
        console.log('error ', error)
    })
}
*/

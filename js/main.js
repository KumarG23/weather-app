import axios from "axios";

//declarations
const APIKey = "da140f769044871b7d5db8ca57226465";
const weatherForm = document.querySelector(".weatherForm");
const zipInput = document.querySelector(".zipInput");
let card = document.querySelector(".card");
const country = "us";
let temperature = document.querySelector(".temperature");
let condition = document.querySelector(".condition");
let other = document.querySelector(".other");

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


//display data
function displayWeatherInfo(data) {
  console.log(data);
  const {
    name: city, //what we are fetching from api arrays
    main: {temp},
    weather: [{ description, id, icon}],
  } = data;

//text content / displays n/a
  card.textContent = "";
  card.style.display = "";
  temperature.textContent = "";
  temperature.style.display = "";
  condition.textContent = "";
  condition.style.display = "";
  other.textContent = "";
  other.style.display = "";

// create elements
  let cityDisplay = document.createElement("p");
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
  tempDisplay.classList.add("tempDisplay");
  tempFarDisplay.classList.add("tempFarDisplay");
  tempCelDisplay.classList.add("tempCelDisplay");
  //humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");


  //append created elements to parent
  card.appendChild(cityDisplay, "p");
  temperature.appendChild(tempDisplay, "p");
  temperature.appendChild(tempFarDisplay, "p");
  temperature.appendChild(tempCelDisplay, "p");
  //condition.appendChild(humidityDisplay, "p");
  condition.appendChild(descDisplay, "p");
  other.appendChild(weatherEmoji, "p");
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

import axios from "axios";

const APIKey = "da140f769044871b7d5db8ca57226465";
const weatherForm = document.querySelector(".weatherForm");
const zipInput = document.querySelector(".zipInput");
const card = document.querySelector(".card");
const country = "us";

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

async function getWeatherData(zip) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${APIKey}`;

  const response = await fetch(apiURL);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  console.log(data);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id, icon}],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const tempFarDisplay = document.createElement("p");
  const tempCelDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("img");
  
  cityDisplay.textContent = city;
  tempDisplay.textContent = `${temp}`;
  tempFarDisplay.textContent = `${(((temp - 273.15) * 9) / 5 + 32).toFixed(1)}`;
  tempCelDisplay.textContent = `${temp - 273.15}`;
  humidityDisplay.textContent = humidity;
  descDisplay.textContent = description;
//   weatherEmoji.textContent = getWeatherEmoji(id);
//   weatherEmoji.src=`https://openweathermap.org/img/wn/${icon}`
  weatherEmoji.src=`https://openweathermap.org/img/wn/${icon}@2x.png`
  
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  tempFarDisplay.classList.add("tempFarDisplay");
  tempCelDisplay.classList.add("tempCelDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(tempFarDisplay);
  card.appendChild(tempCelDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
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

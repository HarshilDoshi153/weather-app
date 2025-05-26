import { useState } from "react";
import './Weather.css';

function App() {
  const api = {
    key: process.env.API_KEY,
    base: "https://api.openweathermap.org/data/2.5/"
  }
  const [query, setQuery] = useState('Ahmedabad');
  const [weather, setWeather] = useState('');

  const search = (event) => {
    if (event.key === 'Enter') {
      let url = `${api.base}weather?units=metric&appid=${api.key}&q=${query}`;
      fetch(`${api.base}weather?units=metric&appid=${api.key}&q=${query}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod === 200) {
            setWeather(result);
          }
          else {
            setWeather('Information Not Found')
          }
        })
    }
  }

  const dateBuilder = (d) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
  return (

    <div className="App">
      <input type="text" placeholder="Enter Location" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
      {(typeof weather.main != "undefined") ? (
        <>
          <div className="location-box">
            <div className="location">
              {weather === "Information Not Found" ? "Information Not Found" : `${weather?.name}, ${weather?.sys?.country}`}
            </div>
            <div className="date">
              {dateBuilder(new Date())}
            </div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {`${Math.round(weather.main.temp)} °C`}
            </div>
            <div className="date">
              {weather.weather[0].main}
            </div>
          </div>
        </>
      ) : ("")}

    </div>
  );
}

export default App;

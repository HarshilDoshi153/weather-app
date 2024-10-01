import { useState } from "react";
import './Weather.css';

function App() {
  const api = {
    key: "88f6901bb3e413e38995495a088991ef",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  const [query, setQuery] = useState('Ahmedabad');
  const [weather, setWeather] = useState('');

  const search = (event) => {
    if (event.key === 'Enter') {
      fetch(`${api.base}weather?units=metric&appid=${api.key}&q=${query}`)
        .then((res) => res.json())
        .then((result) => {
          // console.log(result.cod);
          if (result.cod === 200) {
            setWeather(result);
            console.log(weather);
          }
          else {
            setWeather('Information Not Found')
            console.log(weather.main);
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

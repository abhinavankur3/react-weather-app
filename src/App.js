import React, { useState } from "react";
import axios from "axios";
import "./App.css";

/*
  state = {
    name:"",
    age:0
  }

  setState({name:"Abhinav"})

  host - http://api.weatherapi.com 
  path - /v1/forecast.json
  query-params - ?key=36497fdfe8694866925141606202810&days=5&q=dehradun

  Promise 

  fetch - module (React)
  axios - 3rd party module
*/

// jsx file
const App = () => {
  const [cityName, setCityName] = useState("");
  const [current, setCurrent] = useState({});
  const [forecast, setForecast] = useState({});

  const fiveDayArray = [
    { day: "Sun", temp: 27 },
    { day: "Mon", temp: 28 },
    { day: "Tue", temp: 21 },
    { day: "Wed", temp: 25 },
    { day: "Thu", temp: 30 },
  ];

  const getWeatherForecast = () => {
    if (!cityName) {
      return;
    }
    const url = "http://api.weatherapi.com/v1/forecast.json?key=36497fdfe8694866925141606202810&days=6&q=" + cityName;
    axios.get(url).then((result) => {
      console.log("result", result.data);
      if (result.data) {
        setCurrent(result.data.current);
        setForecast(result.data.forecast);
      }
    });
  };
  return (
    <div className="App">
      <div className="Header">Weather App</div>
      <div className="SearchContainer">
        <input
          type="text"
          placeholder="Search City"
          onChange={(e) => {
            setCityName(e.target.value);
          }}
          style={{ height: "30px", width: "200px", marginRight: "30px" }}
        />
        <input
          type="button"
          value="Search"
          onClick={() => {
            getWeatherForecast();
          }}
          style={{ height: "30px", width: "100px", borderRadius: "10px" }}
        />
      </div>
      <div className="CityName">
        <h3>Searching Temp of: {cityName}</h3>
        <h3>{current.temp_c}</h3>
      </div>
      {fiveDayArray.map((e) => {
        return (
          <div className="Card">
            <h3>{e.day}</h3>
            <h4>{e.temp} &#8451;</h4>
          </div>
        );
      })}
    </div>
  );
};

export default App;

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
  const [dayArray, setDayArray] = useState([]);

  /**
   * [
   *    {day:"Mon", max:34.5, min:24.9},
   *    {day:"Tue", max:34.5, min:24.9},
   *    {day:"Wed", max:34.5, min:24.9},
   * ]
   */

  const daysName = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  const getWeatherForecast = () => {
    if (!cityName) {
      return;
    }
    const url = "http://api.weatherapi.com/v1/forecast.json?key=36497fdfe8694866925141606202810&days=6&q=" + cityName;
    axios.get(url).then((result) => {
      console.log("result", result.data);
      if (result.data) {
        const _forecast = result.data.forecast;

        const newArr = [];
        _forecast.forecastday.forEach((elem) => {
          const obj = {};
          const day = new Date(elem.date).getDay();
          obj.day = daysName[day];
          obj.max = elem.day.maxtemp_c;
          obj.min = elem.day.mintemp_c;
          newArr.push(obj);
        });

        setDayArray(newArr);
      }
    });
  };
  return (
    <div className="App">
      <div className="Header">
        <img src="cloudy.png" style={{ height: "50px", width: "px" }} />
        Weather App
      </div>
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
      </div>
      {dayArray.map((e) => {
        return (
          <div className="Card">
            <h3>{e.day}</h3>
            <div className="TempText">Min: {e.min} &#8451;</div>
            <div className="TempText">Max: {e.max} &#8451;</div>
          </div>
        );
      })}
    </div>
  );
};

export default App;

import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
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
  const [loading, setLoading] = useState(false);

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

  const conditionBackground = {
    Sunny:
      "https://st.depositphotos.com/1903923/1678/v/950/depositphotos_16785893-stock-illustration-sunny-day-background.jpg",
    "Partially Cloudy":
      "https://st.depositphotos.com/1903923/1678/v/950/depositphotos_16785893-stock-illustration-sunny-day-background.jpg",
  };
  const getWeatherForecast = () => {
    if (!cityName) {
      return;
    }
    setLoading(true);
    setDayArray([]);
    const url = "http://api.weatherapi.com/v1/forecast.json?key=36497fdfe8694866925141606202810&days=6&q=" + cityName;
    axios
      .get(url)
      .then((result) => {
        setLoading(false);
        console.log("result", result.data);
        if (result.data) {
          const _forecast = result.data.forecast;

          const newArr = [];
          _forecast.forecastday.forEach((elem) => {
            const obj = {};
            const day = new Date(elem.date).getDay();
            obj.location = elem.location;
            obj.day = daysName[day];
            obj.date = elem.date;
            obj.max = elem.day.maxtemp_c;
            obj.min = elem.day.mintemp_c;
            obj.avg = elem.day.avgtemp_c;
            obj.maxwind = elem.day.maxwind_kph;
            obj.avghumidity = elem.day.avghumidity;
            obj.conditionIcon = "https:" + elem.day.condition.icon;
            obj.conditionText = elem.day.condition.text;
            obj.sunrise = elem.astro.sunrise;
            obj.sunset = elem.astro.sunset;
            obj.moonrise = elem.astro.moonrise;
            obj.moonset = elem.astro.moonset;
            obj.moonphase = elem.astro.moon_phase;

            newArr.push(obj);
          });

          setDayArray(newArr);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };
  return (
    <div className="App">
      {/* Header */}
      <div className="Header">
        <div className="MainHeaderText">Weather App</div>
        <div className="MainHeaderText SideText">by Abhinav Ankur</div>
      </div>
      {/* Search Container */}
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
          style={{ height: "30px", width: "100px", borderRadius: "10px", backgroundColor: "#44bcd8" }}
        />
      </div>
      {loading ? (
        <div className="Loader">
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
      ) : null}
      {dayArray.map((e) => {
        return (
          // Card Container
          <div className="Card">
            <div className="DayText">{e.day}</div>
            <div className="DateText">{e.date}</div>
            <img src={e.conditionIcon} />
            {/* Temperature */}
            <div>
              <div className="TempText">
                <div className="HeaderText">Min</div>
                <div> {e.min} &#8451;</div>
              </div>
              <div className="TempText">
                <div className="HeaderText">Avg</div>
                <div>{e.avg} &#8451;</div>
              </div>
              <div className="TempText">
                <div className="HeaderText">Max</div>
                <div>{e.max} &#8451;</div>
              </div>
            </div>
            {/* Wind Speed & Humidity */}
            <div>
              <div className="PropertyText">
                <div className="HeaderText">Max Wind Speed</div>
                <div>{e.maxwind} Km/h</div>
              </div>
              <div className="PropertyText">
                <div className="HeaderText">Avg Humidity</div>
                <div>{e.avghumidity} Km/h</div>
              </div>
            </div>
            {/* Sunrise & Sunset */}
            <div>
              <div className="PropertyText">
                <div className="HeaderText">Sunrise</div>
                <div>{e.sunrise}</div>
              </div>
              <div className="PropertyText">
                <div className="HeaderText">Sunset</div>
                <div>{e.sunset}</div>
              </div>
            </div>
            {/* Moonrise, Moonset & Moon Phase */}
            <div>
              <div className="TempText">
                <div className="HeaderText">Moonrise</div>
                <div> {e.moonrise}</div>
              </div>
              <div className="TempText">
                <div className="HeaderText">Moon Phase</div>
                <div>{e.moonphase}</div>
              </div>
              <div className="TempText">
                <div className="HeaderText">Moonset</div>
                <div>{e.moonset}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;

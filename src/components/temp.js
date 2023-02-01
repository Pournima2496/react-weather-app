import React, { useEffect, useState } from 'react'
import './style.css'
import WeatherCard from './weatherCard';

const Temp = () => {

  const [search, setSearch] = useState("Pune");
  const [tempInfo, setTempInfo] = useState(" ");

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=68e77a4836eb61ea851985dd81ec94c6`;

      const res = await fetch(url);
      const data = await res.json();

      const {temp, humidity, pressure} = data.main;
      const {main:weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country, sunset} = data.sys;
      const myNewWeatherInfo = {
        temp, humidity, pressure, weathermood, name, speed, country, sunset
      }

      setTempInfo(myNewWeatherInfo)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getWeatherInfo();
  })
  return (
    <>
      {/* Search  */}

      <div className="wrap">
        <div className="search">
          <input type="search" placeholder='search...' autoFocus id='search' className='searchTerm' value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>
      </div>

      <WeatherCard tempInfo ={tempInfo}/>

     </>
  )
}

export default Temp

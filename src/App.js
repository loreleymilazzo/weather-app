
import React, { useState } from 'react';
import './App.css';
import loading from  './img/loading.gif';
import axios from 'axios';
import Nav from './components/Nav';
import Cards from './components/Cards';

const apiKey = '4ae2636d8dfbdc3044bede63951a019b';

export default function App() {

  const [cities, setCities] = useState([]);
  const [isSearch, setSearch] = useState(false);

  function onSearch(city) {
    
    if(cities.find(e=>e.name.toUpperCase()===city.toUpperCase()))return alert('La ciudad ya está agregada');
    
    setSearch(true);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then((info) => {
        if (info.data.main) {
          const city = {
            min: Math.round(info.data.main.temp_min),
            max: Math.round(info.data.main.temp_max),
            img: info.data.weather[0].icon,
            id: info.data.id,
            name: info.data.name,
            latitud: info.data.coord.lat,
            longitud: info.data.coord.lon,
            desc: info.data.weather[0].description,
          };
          setCities(state => [...state, city]);
          setSearch(false);
        }
        else {
          setSearch(false);
          alert('La ciudad no existe');
        }
      })
      .catch(() => {
        setSearch(false);
        alert('La ciudad no existe');
      });
  }

  function onClose(id) {
    setCities(oldCities => oldCities.filter(city => city.id !== id));
  }

  return (
    <div className="App">
      <Nav onSearch={onSearch} />
      {
        isSearch
          ?
          <img alt='loading' loading='lazy'
          src={loading}
          ></img>
          :
          <Cards cities={cities} onClose={onClose} />
      }

    </div>
  );
}
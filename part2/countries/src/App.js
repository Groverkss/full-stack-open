import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const Display = ({ content }) => {
  const [ weather, setWeather ] = useState('');
  const [ weatherResponse, setResponse ] = useState({});

  useEffect( () => {
    axios
      .get( `http://api.weatherstack.com/current?`+ 
        `access_key=${apiKey}&query=${weather}`)
      .then(res => res.data )
      .catch( err => {
        return {};
      }).then( res => {
        setResponse(res);
      } )
  } , [ weather ])

  if (content.length > 10) {
    return (
      "Too many matches, specify another filter"
    );
  } else if (content.length === 1) {
    const country = content[0];
    if (country.name !== weather) {
      setWeather(country.name);
    }
    return (
      <>
        <h1>
          {country.name}
        </h1>

        <ul>
          <li> Capital: {country.capital} </li>
          <li> Population: {country.population} </li>
        </ul>

        <h2>
          Languages
        </h2>

        <ol>
          { 
            country
              .languages
              .map( lang => <li key={lang.name}> {lang.name} </li> )
          } 
        </ol>
        <img src={country.flag} height="90px" width="150px" />

        <h2>
          Weather in {weatherResponse?.location?.name} 
        </h2>

        <b>Temprature : </b>

        {weatherResponse?.current?.temperature} Celcius <br />

        <img src={weatherResponse?.current?.weather_icons} /> <br/>

        <b>Wind : </b> {weatherResponse?.current?.wind_speed}{" "} 
        direction {weatherResponse?.current?.wind_dir}
      </>
    );
  } else {
    return (
      <ul>
        { content.map( val => <li key={val.name}> {val.name} </li> ) }
      </ul>
    );
  }
};

const App = () => {
  const [ search, setSearch ] = useState('');
  const [ content, setContent ] = useState([]);

  useEffect( () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => res.data )
      .catch( err => {
        return [];
      }).then( res => {
        setContent(res);
      } )
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const shownCountries = content.filter( country => (
    country
    .name
    .toLowerCase()
    .startsWith(search.toLowerCase())
  ));

  return (
    <>
      <div>
        Enter a country name: <input value={search} onChange={handleSearch}/>
      </div>

      <br />

      <Display content={shownCountries}/>
    </>
  );
};

export default App;


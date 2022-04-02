import { useState } from 'react';

import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import SearchInput from './components/SearchInput/SearchInput';
import SearchButton from './components/SearchButton/SearchButton';
import Container from './components/Container/Container';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';

import './App.scss';

const App = () => {
  const [searchString, changeSearchString] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentWeatherData, changeCurrentWeatherData] = useState({});

  const fetchCurrentWeatherData = async () => {
    if(searchString !== '') {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
        }
      };
      const api = {
        url: 'https://community-open-weather-map.p.rapidapi.com',
        endpoint: '/weather',
        urlParams: `q=${searchString}&units=metric`,
      };
      const url = `${api.url}${api.endpoint}?${api.urlParams}`;
  
      try {
        const response = await fetch(url, options);
  
        if(response.ok) {
          const data = await response.json();
          changeCurrentWeatherData(data);
          setDataLoaded(true);
        }
      } catch(error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header>
        <Container>
          <SearchBar>
            <SearchInput
              value={searchString}
              onChangeFunc={changeSearchString}
            />
            <SearchButton onClickFunc={fetchCurrentWeatherData} />
          </SearchBar>
        </Container>
      </Header>
      <main>
        <Container>
          {dataLoaded &&
            <CurrentWeather data={currentWeatherData} />
          }
        </Container>
      </main>
    </>
  );
}

export default App;

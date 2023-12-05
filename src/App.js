
import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react' 
import TopButtons from './components/TopButtons';
import Something from './components/Something';
import TimeAndLocation from './components/TimeAndLocation';
import TemparatureAndDetails from './components/TemparatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherServices';
import React from 'react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  const [query, setQuery] = React.useState({q: "Kansas"});
  const [units, setUnits] = React.useState("metric");
  const [weather, setWeather] = React.useState("london");

 useEffect(()=> {
  const fetchweather = async() =>{
    const message = query.q ?  query.q : 'Current_Location.'
    toast.info("Fetching Data for " + message)
  await getFormattedWeatherData({...query,  units}).then(
    (data)=> 
    {
      toast.success("Successfully Fetched Data for "+ `${data.name} , ${data.country}`  )
      setWeather(data);
    }
  );
  }
fetchweather();
 }, [query, units]);
 
 const formatBackground = () =>{
    if(!weather) return  'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60
    if(weather.temp <= threshold) return ' from-cyan-700 to-blue-700'
    return 'from-yellow-700 to-organe-700';
  }
  return ( 
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br
    from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
     <TopButtons setQuery={setQuery}/>
     <Something setQuery={setQuery} units={setUnits} setUnits={setUnits}/>

     { weather && (
     <div>
     <TimeAndLocation weather={weather} />

     <TemparatureAndDetails weather={weather} />

     <Forecast title="hourly forecast" items={weather.hourly}/>
     <Forecast title="daily forecast" items={weather.daily}/>

     <ToastContainer autoClose={2000} theme='colored' newestOnTop={true}/>
     </div>
     )
     }

    </div>
  );
}

export default App;

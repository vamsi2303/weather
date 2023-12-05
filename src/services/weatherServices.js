import { DateTime } from "luxon";

const API_KEY="1fa9ff4126d95b8db54f3897a208e91c"
const Base_URL="https://api.openweathermap.org/data/2.5/"


const getweatherdata = (infodata , searchParams) =>{
    const url = new URL(Base_URL + infodata);
    url.search = new URLSearchParams({...searchParams,appid:API_KEY});

   

    return fetch(url)
    .then((res) =>res.json());


};

const formatForecastWeather = (data) => {
    let {timezone, daily, hourly} = data;
    daily = daily.slice(1,6).map( d =>
        {
            return {
                title: formatTolocalTime(d.dt , timezone , 'cccc'),
                temp : d.temp.day,
                icon : d.weather[0].icon
            }
        });
        hourly = hourly.slice(1,6).map( d =>
            {
                return {
                    title: formatTolocalTime(d.dt , timezone , 'hh:mm a '),
                    temp : d.temp,
                    icon : d.weather[0].icon
                }
            });

    return {timezone, daily, hourly};
 };

const formatCurrentWeather = (data) => {
    const {
        coord: {lat,lon},
        main: {temp, temp_min, temp_max,feels_like,humidity},
        name,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed}
    } = data

    const {main : details , icon} = weather[0];



    return {lat,lon,temp,temp_min,temp_max,feels_like,humidity,name, dt,country,sunrise,sunset,details,icon,speed}

}

const getFormattedWeatherData = async(searchParams) => {
    const formattedCurrentWeather = await getweatherdata('weather', searchParams)
                                    .then(formatCurrentWeather)

const {lat, lon} = formattedCurrentWeather

const formattedforecastweather = await getweatherdata('onecall', 
            {lat, lon, exclude:  'current,minutely,alerts', units:searchParams.units })
            .then(formatForecastWeather)




    return {...formattedCurrentWeather, ...formattedforecastweather };
}

const formatTolocalTime = (secs, zone , format ="cccc, dd LLL yyyy'|Local time: 'hh:mm a  ") => DateTime.fromSeconds(parseInt(secs)).setZone(zone).toFormat(format); 

const iconUrlfromCode = (code) => 
                        `http://openweathermap.org/img/wn/${code}@2x.png`;


export default getFormattedWeatherData;

export {formatTolocalTime, iconUrlfromCode};
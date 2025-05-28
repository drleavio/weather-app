import { useEffect, useState } from 'react';
import ForecastApp from './ForecastApp';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import location from "../assets/location.svg"

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(true);
    const [unit, setUnit] = useState('metric'); 
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    useEffect(() => {
        if (!user) navigate('/');
    }, [user, navigate]);

    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`

            );
            const data = await res.json();
            console.log(data);

            setWeather(data);
            setCity(data.name); // auto-set city
            setLoading(false);
        } catch (error) {
            console.error('Error fetching weather by coords:', error);
            setLoading(false);
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoords({ lat: latitude, lon: longitude });
                    fetchWeatherByCoords(latitude, longitude);
                },
                (error) => {
                    console.error('Geolocation error:', error.message);
                    setLocationError('Location access denied.');
                    setLoading(false);
                }
            );
        } else {
            setLocationError('Geolocation is not supported by your browser.');
            setLoading(false);
        }
    };

    const getWeatherByCity = async () => {
        if (!city) return;
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
            );
            const data = await res.json();
            setWeather(data);
            setCity('')
        } catch (err) {
            console.error('Failed to fetch weather:', err);
        }
    };

    useEffect(() => {
        getLocation();
        const timer = setInterval(getLocation, 120000);
        return () => clearInterval(timer);
    }, [unit]);

    if (loading) return <p className="p-4">Loading weather...</p>;
    if (locationError) return <p className="p-4 text-red-500">{locationError}</p>;

    return (
        <div className="h-full w-full overflow-y-auto bg-linear-to-r/srgb from-indigo-500 to-teal-400">
            <div className="w-full flex items-center justify-between px-4 py-2 ">
                <div className="text-lg font-semibold">Hello {user?.email}</div>
               
                <div className="flex gap-2 border rounded-xl">
                    <input
                        type="text"
                        placeholder="Enter city"
                        
                        onChange={(e) => setCity(e.target.value)}
                        className=" px-2 py-1 rounded"
                    />
                    <button
                        onClick={getWeatherByCity}
                        className="bg-blue-500 text-white px-2 rounded-xl"
                    >
                        Get Weather
                    </button>
                </div>
            </div>

            {weather && weather.main && (
                <div className=" w-full flex items-center justify-center flex-col">

                    <div className="mt-4 w-full p-4 px-5 md:px-10  lg:px-80">
                        <div className='py-10'>
                            <div className='flex items-center justify-start gap-2'>
                                <img src={location} alt="" />
                        <h2 className="text-xl font-bold">{weather.name}</h2>
                        </div>
                        <div className='flex items-center justify-between flex-col md:flex-row'>
                        <div className='flex gap-3'>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                         <div className='flex items-center justify-center'>
                            <div className='text-4xl'> {weather.main.temp}° </div><div className='flex gap-2 text-xl cursor-pointer'><div className={unit === 'metric'?"text-gray-300":"text-gray-700"} onClick={() => setUnit('metric')}>C |</div><div></div><div className={unit !== 'metric'?"text-gray-300":"text-gray-700"} onClick={() => setUnit('imperial')}>F</div></div>
                        </div>
                        <div className='flex items-center justify-center flex-col'>
                        <p>💧 Humidity: {weather.main.humidity} %</p>
                        <p>🌬 Wind: {weather.wind.speed} m/s</p>
                        </div>
                        </div>
                        <div>
                            <h2 className='text-2xl'>Weather</h2>
                            <p>{weekday[d.getDay()]}</p>
                        <p className="capitalize">{weather.weather[0].description}</p>

                        
                        </div>
                        </div>
                        </div>
                    </div>
                    <ForecastApp city={weather.name}/>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

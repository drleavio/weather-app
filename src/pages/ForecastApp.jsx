import { useEffect, useState } from 'react';
import Card from '../components/Card';


const ForecastApp = ({city}) => {
    
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey ="1d17300add79e3f3df47f4e6c4833a52";

  const fetchForecast = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await res.json();
      const dailyData = groupByDay(data.list);
      console.log(dailyData,"data");
      
      setForecast(dailyData);
    } catch (error) {
      console.error('Error fetching forecast:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupByDay = (list) => {
    const map = {};
    list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0]; 
      if (!map[date]) map[date] = [];
      map[date].push(item);
    });

    return Object.entries(map).map(([date, entries]) => {
      const middayEntry =
        entries.find((e) => e.dt_txt.includes('12:00:00')) || entries[0];
      return {
        date,
        temp: middayEntry.main.temp,
        description: middayEntry.weather[0].description,
        icon: middayEntry.weather[0].icon,
      };
    });
  };
 
  useEffect(() => {
    fetchForecast();
  }, [city]);

  if (loading) return <p>Loading forecast...</p>;

  return (
    <div className='w-full flex items-center justify-center flex-col' style={{ padding: 20 }}>
      <h2 className='mb-5'>6-Day Weather Forecast for {city}</h2>
      <div className='w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
        {forecast.map((day, i) => (
         <Card key={i} day={day}/>
        ))}
      </div>
    </div>
  );
};

export default ForecastApp;

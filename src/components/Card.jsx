import React from 'react'

const Card = ({day}) => {
  return (
    <div
    className='flex items-center justify-center flex-col border-2 border-gray-200 px-3 py-3 rounded-lg'
  >
    <h4>{new Date(day.date).toLocaleDateString(undefined, { weekday: 'long' })}</h4>
    <img
      src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
      alt={day.description}
    />
    <p>{day.description}</p>
    <p><strong>{day.temp} °C</strong></p>
  </div>
  )
}

export default Card
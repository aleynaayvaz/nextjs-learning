"use client"
import { useState } from "react"

export default function Home() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<{
    temp: number, 
    description: string, 
    city: string,
    icon: string,
    feels_like: number,
    humidity: number,
    wind_speed: number
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  async function fetchWeather() {
    setLoading(true)
    setErrorMessage("")
    setWeather(null)
    if (city.trim() === "") {
      setErrorMessage("Please enter city name, not be empty")
      setLoading(false)
      return
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric&lang=en`
    )
    const data = await res.json()
    console.log(data)
    setWeather({
    temp: Math.round(data.main.temp),
    description: data.weather[0].description,
    city: data.name,
    icon: data.weather[0].icon,
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    wind_speed: data.wind.speed
    })
    console.log(data.main.feels_like, data.main.humidity)
    setLoading(false)
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">Weather App</h1>
      <div className="flex gap-4">
        <input
          className="p-3 rounded-lg bg-gray-800 border border-blue-500/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button 
          className="p-3 bg-blue-700 rounded-lg font-bold hover:scale-105 transition-transform"
          onClick={fetchWeather}>
          Search
        </button>
      </div>
      <div>
        {loading && <p className="mt-8 text-gray-400">Loading...</p>}
        {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
        {weather && (
          <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-blue-500/30 w-96 max-w-md--lg">
            <h2 className="text-center text-3xl font-bold">{weather.city}</h2>
            <div className="flex justify-center items-center gap-2">
              <p className="text-center text-xl mt-2 mr-4">{weather.description}</p>
              <p className="text-4xl font-bold">{weather.temp}°C</p>
              <img 
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                width={80}
                height={80}
              />
            </div>
            <div className="grid grid-cols-5 gap-4 mt-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Feels Like</p>
                <p className="font-bold">{weather.feels_like}°C</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Humidity</p>
                <p className="font-bold">{weather.humidity}%</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Wind Speed</p>
                <p className="font-bold">{weather.wind_speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
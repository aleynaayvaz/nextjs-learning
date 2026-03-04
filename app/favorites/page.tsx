"use client"
import { useState, useEffect } from "react"
import useWeather from "../hooks/useWeather"
import WeatherCard from "../components/WeatherCard"

export default function Forecast() {
  const [favoriteCities, setFavoriteCities] = useState([])
  const { weather, loading, errorMessage, fetchWeather } = useWeather()
  
  useEffect(() => {
      const saved = localStorage.getItem("favoriteCities")
      if (saved) {
        setFavoriteCities(JSON.parse(saved))
      }
    }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">Favorites</h1>
      <div className="flex flex-col gap-3 w-96">
        {loading && <p className="mt-8 text-gray-400">Loading...</p>}
        {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
        {favoriteCities.map((city: string) => (
          <button 
            key={city}
            className="p-3 bg-gray-800 rounded-xl border border-blue-500/30 hover:border-blue-500 transition-all"
            onClick={() => fetchWeather(city)}>
            {city}
          </button>
        ))}
       {weather && <WeatherCard weather={weather}/>}
      </div>
    </div>
  )
}
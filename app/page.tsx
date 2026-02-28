"use client"
import { useState } from "react"

export default function Home() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<{temp: number, description: string, city: string} | null>(null)
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
    temp: data.main.temp,
    description: data.weather[0].description,
    city: data.name
    })
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
          <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-blue-500/30">
            <h2 className="text-2xl font-bold">{weather.city}</h2>
            <p className="text-5xl font-bold mt-4">{weather.temp}°C</p>
            <p className="text-gray-400 mt-2">{weather.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
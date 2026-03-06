"use client"
import { useEffect, useState } from "react"
import useWeather from "./hooks/useWeather"
import WeatherCard from "./components/WeatherCard"
import { useRouter } from "next/navigation"

export default function Home() {
  const [city, setCity] = useState("")
  const [favoriteCities, setFavoriteCities] = useState<string[]>([])
  const {weather, loading, errorMessage, fetchWeather } = useWeather()
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem("favoriteCities")
    if (saved) {
      setFavoriteCities(JSON.parse(saved))
    }
  }, [])
  
  function addToFavorites(city: string) {
    if (favoriteCities.includes(city)) {
      setSuccessMessage("Already in favorites!")
      setTimeout(() => setSuccessMessage(""), 3000)
      return
    }
    const updated = [...favoriteCities, city]
    setFavoriteCities(updated)
    localStorage.setItem("favoriteCities", JSON.stringify(updated))
    setSuccessMessage("Successfully added to favorites!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">Weather App</h1>
      <div className="flex gap-4 justify-between w-96">
        <input
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-blue-500/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchWeather(city)
            }
          }}
        />
        <button 
          className="p-3 rounded-lg bg-blue-700 font-bold hover:scale-105 transition-transform"
          onClick={() => fetchWeather(city)}>
          Search
        </button>
        
      </div>
      <div>
        {loading && <p className="mt-8 text-gray-400">Loading...</p>}
        {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
        {successMessage && <p className="mt-2 text-sm text-green-500">{successMessage}</p>}
        {weather && 
          <div>
            <WeatherCard weather={weather}/>
            <div className="flex gap-4 justify-between w-96">
              {weather && (
                <button 
                  className="flex-1 p-3 mt-4 bg-yellow-500 rounded-lg font-bold hover:scale-105 transition-transform"
                  onClick={() => addToFavorites(weather.city)}>
                  Add to Favorites
                </button>
              )}
              <button 
                className="flex-1 p-3 mt-4 bg-blue-500 rounded-lg font-bold hover:scale-105 transition-transform"
                onClick={() => router.push(`/forecast?city=${weather.city}`)}>
                View Forecast
              </button>
            </div>
          </div>
        }
        </div>
    </div>
  )
}
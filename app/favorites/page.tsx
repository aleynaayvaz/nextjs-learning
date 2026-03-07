"use client"
import { useState, useEffect } from "react"
import useWeather from "../hooks/useWeather"
import WeatherCard from "../components/WeatherCard"
import { useRouter } from "next/navigation"

export default function Forecast() {
  const [favoriteCities, setFavoriteCities] = useState([])
  const { weather, loading, errorMessage, fetchWeather } = useWeather()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
      const saved = localStorage.getItem("favoriteCities")
      if (saved) {
        setFavoriteCities(JSON.parse(saved))
      }
    }, [])

  function removeFavorite(city: string) {
    const newFavoriteList = favoriteCities.filter((c) => c !== city )
    setFavoriteCities(newFavoriteList)
    localStorage.setItem("favoriteCities", JSON.stringify(newFavoriteList))
    setSelectedIndex(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">Favorites</h1>
      <div className="flex flex-col gap-3 w-96">
        {loading && <p className="mt-8 text-gray-400">Loading...</p>}
        {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
        {favoriteCities.length === 0 && (
          <p className="text-gray-400">No favorites yet. Add some cities!</p>
        )}
        {favoriteCities.map((city: string, index: number) => (
          <div key={city}>
            <div className="flex gap-4 justify-between w-96">
              <button 
                className="flex-2 mt-4 p-2 bg-gray-800 rounded-xl border border-blue-500/30 hover:border-blue-500 transition-all"
                onClick={() => {
                  if (selectedIndex === index) {
                    setSelectedIndex(null)
                  } else {
                    setSelectedIndex(index)
                    fetchWeather(city)
                  }
                }}>{city}</button>
              <button 
                className="flex-1 p-2 mt-4 bg-gray-800 rounded-xl border border-blue-500/30 hover:border-blue-500 transition-all"
                onClick={() => removeFavorite(city)}>Delete</button>
              <button 
                className="flex-2 p-2 mt-4 bg-blue-500 rounded-lg font-bold hover:scale-105 transition-transform"
                onClick={() => router.push(`/forecast?city=${city}`)}>
                View Forecast
              </button>
            </div>
            {selectedIndex === index && weather && <WeatherCard weather={weather} />}
          </div>
        ))}
      </div>
    </div>
  )
}
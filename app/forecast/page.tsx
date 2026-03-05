"use client"
import { useSearchParams } from "next/navigation"
import {useRouter} from "next/navigation"
import { useEffect, useState } from "react"

export default function Forecast() {
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [forecast, setForecast] = useState<any[]>([])
  const searchParams = useSearchParams()
  const cityParam = searchParams.get("city")
  const [cityName, setCityName] = useState("")
  const router = useRouter()

  async function fetchForecast(city: string) {
    setLoading(true)
    setErrorMessage("")
    if (city.trim() === "") {
      setErrorMessage("Please enter city name, not be empty")
      setLoading(false)
      return
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric&lang=en`
    )
    const data = await res.json()
    setForecast(data.list.filter((item: any) => item.dt_txt.includes("12:00:00")))
    setCityName(data.city.name)
    setLoading(false)
  }

  useEffect(() => {
  if (cityParam) {
    fetchForecast(cityParam)
  }
}, [cityParam])
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Forecast</h1>
      <div className="flex gap-4">
        <input
          className="p-3 rounded-lg bg-gray-800 border border-blue-500/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button 
          className="p-3 bg-blue-700 rounded-lg font-bold hover:scale-105 transition-transform"
          onClick={() => {
            fetchForecast(city)
            router.push(`/forecast?city=${city}`)
            }}>
          Search
        </button>
      </div>
      <div>
        {loading && <p className="mt-8 text-gray-400">Loading...</p>}
        {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
        {forecast && (
          <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-blue-500/30 w-96 max-w-md--lg">
            <h2 className="text-center text-2xl font-bold mb-6">{cityName}</h2>
            {forecast.map((item: any) => (
              <div key={item.dt} className="flex justify-between p-3 bg-gray-800 rounded-xl mb-2">
                <p>{item.dt_txt.split(" ")[0]}</p>
                <p>{Math.round(item.main.temp)}°C</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
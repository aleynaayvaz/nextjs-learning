import { useState } from "react"

export default function useWeather() {
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
  

    async function fetchWeather(city: string) {
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
    if (data.cod === "404") {
      setErrorMessage("City not found. Please check the city name.")
      setLoading(false)
      return
    }
    setWeather({
    temp: Math.round(data.main.temp),
    description: data.weather[0].description,
    city: data.name,
    icon: data.weather[0].icon,
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    wind_speed: data.wind.speed
    })
    setLoading(false)
  }  

  return { weather, loading, errorMessage, fetchWeather }
}
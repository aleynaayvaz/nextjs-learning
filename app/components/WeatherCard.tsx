type WeatherData = {
    temp: number, 
    description: string, 
    city: string,
    icon: string,
    feels_like: number,
    humidity: number,
    wind_speed: number
    }

export default function WeatherCard({weather} : { weather: WeatherData }) {
        
    return (
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
    )
}
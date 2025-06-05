async function getWeatherData(){
  const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Lorentzville?unitGroup=uk&key=YAR3JR9E9LY9WG2DMEGE8XY66&contentType=json");
   
  if (!response.ok) {
    throw new Error("Error retrieving weather data");
  }

  const data = await response.json();
  return data;
    
}

function formatTime(time) {
  const formattedTime = time.slice(0, 5);

  return formattedTime;
}


exports.renderWeatherPage = async (req, res) => {
  const weatherData = await getWeatherData();

  const weatherPageContent = {
    title: "Weather Forcast",
    tempHeader: "Temperature",
    conditionsHeader: "Conditions",
    minTemp: weatherData.days[0].tempmin,
    maxTemp: weatherData.days[0].tempmax,
    conditions: weatherData.days[0].conditions,
    sunrise: `Sunrise ${formatTime(weatherData.days[0].sunrise)}`,
    sunset: `Sunset ${formatTime(weatherData.days[0].sunset)}`,
    rainfall: `${weatherData.days[0].precip}mm`
  };

  res.render("weatherPage", weatherPageContent);
} 

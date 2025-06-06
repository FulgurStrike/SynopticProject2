require('dotenv').config();

async function getWeatherData(){
  const response = await fetch(process.env.API_KEY);
   
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

function averageRainfallPerWeek(weatherData) {
  let sum = 0;
  let count = 1;
  weatherData.forEach(day => {
    sum += Number(day.precip);
    count++
  });

  const average = sum / count;

  return sum;
}


exports.renderWeatherPage = async (req, res) => {
  const weatherData = await getWeatherData();

  const averageRainfall = averageRainfallPerWeek(weatherData.days);

  console.log(averageRainfall);

  const weatherPageContent = {
    title: "Weather Forcast",
    tempHeader: "Temperature",
    conditionsHeader: "Conditions",
    minTempLabel: "Min Temp",
    maxTempLabel: "Max Temp",
    minTemp: weatherData.days[0].tempmin,
    maxTemp: weatherData.days[0].tempmax,
    conditions: weatherData.days[0].conditions,
    sunrise: `Sunrise ${formatTime(weatherData.days[0].sunrise)}`,
    sunset: `Sunset ${formatTime(weatherData.days[0].sunset)}`,
    rainfall: `${weatherData.days[0].precip}mm`
  };

  res.render("weatherPage", weatherPageContent);
} 

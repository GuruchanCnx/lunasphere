import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import MoonPhaseCalculator from "./components/MoonPhaseCalculator";
import CulturalTraditions from "./components/CulturalTraditions";
import WorldMap from "./components/WorldMap";
import AstralMap from "./components/AstralMap";
import AIAssistant from "./components/AIAssistant";

const App = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lng: -74.0060 });
  const [moonPhase, setMoonPhase] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [activePage, setActivePage] = useState("home");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // Mock city database
  const mockCities = [
    { name: "New York", country: "USA", lat: 40.7128, lng: -74.0060 },
    { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
    { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
    { name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
    { name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 }
  ];

  const translations = {
    en: {
      title: "LunaSphere",
      subtitle: "Discover the cosmic wisdom of moon phases across cultures, astrology, and human connection",
      navigation: {
        home: "Home",
        cosmology: "Cosmology", 
        cultural: "Cultural",
        astrology: "Astrology",
        intimacy: "Intimacy",
        memories: "My Memories"
      }
    }
  };

  const t = translations[selectedLanguage];

  const calculateMoonPhase = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let c = Math.floor(year / 100);
    let e = 2 - c + Math.floor(c / 4);
    let jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + e - 1524.5;
    let daysSinceNewMoon = jd - 2451549.5;
    let newMoons = daysSinceNewMoon / 29.53;
    let fraction = newMoons - Math.floor(newMoons);
    if (fraction < 0.02 || fraction > 0.98) return { name: "New Moon", emoji: "🌑", fraction };
    if (fraction < 0.23) return { name: "Waxing Crescent", emoji: "🌒", fraction };
    if (fraction < 0.27) return { name: "First Quarter", emoji: "🌓", fraction };
    if (fraction < 0.48) return { name: "Waxing Gibbous", emoji: "🌔", fraction };
    if (fraction < 0.52) return { name: "Full Moon", emoji: "🌕", fraction };
    if (fraction < 0.73) return { name: "Waning Gibbous", emoji: "🌖", fraction };
    if (fraction < 0.77) return { name: "Last Quarter", emoji: "🌗", fraction };
    return { name: "Waning Crescent", emoji: "🌘", fraction };
  };

  const getMockWeatherData = (dateString, location) => {
    const date = new Date(dateString);
    const month = date.getMonth();
    let baseTemp = month >= 2 && month <= 4 ? 15 : month >= 5 && month <= 7 ? 25 : month >= 8 && month <= 10 ? 18 : 5;
    const temp = Math.round(baseTemp + (Math.random() * 10 - 5));
    const conditions = ["Clear", "Partly Cloudy", "Cloudy", "Rainy", "Thunderstorm", "Snowy"];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    let weatherIcon = condition === "Clear" ? "☀️" : condition === "Partly Cloudy" ? "⛅" : condition === "Cloudy" ? "☁️" : condition === "Rainy" ? "🌧️" : condition === "Thunderstorm" ? "⛈️" : "❄️";
    return { location, temperature: temp, condition, icon: weatherIcon, date: dateString };
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setWeatherData(null);
    if (e.target.value) {
      const date = new Date(e.target.value);
      setMoonPhase(calculateMoonPhase(date));
    }
  };

  const fetchWeatherData = () => {
    if (!selectedDate || !location) return;
    const weather = getMockWeatherData(selectedDate, location);
    setWeatherData(weather);
  };

  const handleCitySearch = (query) => {
    if (query.length > 2) {
      const city = mockCities.find(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.country.toLowerCase().includes(query.toLowerCase())
      );
      if (city) {
        setLocation(`${city.name}, ${city.country}`);
        setCoordinates({ lat: city.lat, lng: city.lng });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-blue-900 to-navy-900">
      <Navigation 
        activePage={activePage} 
        setActivePage={setActivePage} 
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        translations={t}
      />
      
      <div className="pt-16">
        {activePage === "home" && (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12 pt-20">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-xl text-yellow-200 max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <MoonPhaseCalculator 
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                location={location}
                setLocation={setLocation}
                moonPhase={moonPhase}
                weatherData={weatherData}
                handleDateChange={handleDateChange}
                fetchWeatherData={fetchWeatherData}
                handleCitySearch={handleCitySearch}
                translations={t}
              />

              {moonPhase && (
                <CulturalTraditions 
                  moonPhase={moonPhase} 
                  translations={t}
                />
              )}

              {coordinates.lat !== 0 && coordinates.lng !== 0 && (
                <WorldMap 
                  coordinates={coordinates} 
                  location={weatherData?.location || location}
                  translations={t}
                />
              )}

              {weatherData && (
                <AstralMap 
                  translations={t}
                />
              )}

              <AIAssistant translations={t} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

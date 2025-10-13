import React, { useState } from 'react';

const MoonPhaseCalculator = ({ 
  selectedDate, 
  setSelectedDate, 
  location, 
  setLocation, 
  moonPhase, 
  weatherData, 
  handleDateChange, 
  fetchWeatherData, 
  handleCitySearch,
  translations 
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Discover Your Lunar Connection</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-yellow-300 mb-2 text-lg font-medium">{translations.dateLabel || "Select Date"}</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full px-4 py-3 bg-yellow-50 border-2 border-navy-900 rounded-xl text-navy-900 placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label className="block text-yellow-300 mb-2 text-lg font-medium">{translations.locationLabel || "Search City"}</label>
          <input
            type="text"
            placeholder="Search for a city..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleCitySearch(e.target.value);
            }}
            className="w-full px-4 py-3 bg-yellow-50 border-2 border-navy-900 rounded-xl text-navy-900 placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {selectedDate && location && (
          <button
            onClick={fetchWeatherData}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-navy-900 font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {translations.getWeather || "Get Weather Context"}
          </button>
        )}

        {moonPhase && (
          <div className="bg-white/20 rounded-2xl p-6 border border-white/10">
            <div className="text-center">
              <div className="text-6xl mb-4">{moonPhase.emoji}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{moonPhase.name}</h3>
              <div className="mt-4 bg-white/30 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${moonPhase.fraction * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-yellow-300 mt-2">
                {Math.round(moonPhase.fraction * 100)}% {translations.lunarCycle || "lunar cycle"}
              </p>
            </div>
          </div>
        )}

        {weatherData && (
          <div className="bg-white/20 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">{translations.weatherContext || "Weather Context"}</h3>
            <div className="text-center">
              <div className="text-5xl mb-3">{weatherData.icon}</div>
              <p className="text-lg text-white font-medium mb-1">{weatherData.location}</p>
              <p className="text-3xl font-bold text-white mb-2">{weatherData.temperature}°C</p>
              <p className="text-yellow-200 mb-3">{weatherData.condition}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoonPhaseCalculator;

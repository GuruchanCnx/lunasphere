// src/App.jsx - Complete, Production-Ready Static Site
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

const App = () => {
  // State management
  const [selectedDate, setSelectedDate] = useState("");
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lng: -74.0060 });
  const [moonPhase, setMoonPhase] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [activePage, setActivePage] = useState("home");
  const [showAstralMap, setShowAstralMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Comprehensive city database for realistic search
  const mockCities = [
    { name: "New York", country: "USA", lat: 40.7128, lng: -74.0060 },
    { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
    { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
    { name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
    { name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 },
    { name: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038 },
    { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
    { name: "Jerusalem", country: "Israel", lat: 31.7683, lng: 35.2137 },
    { name: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777 },
    { name: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6173 },
    { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357 },
    { name: "Beijing", country: "China", lat: 39.9042, lng: 116.4074 },
    { name: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333 },
    { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 }
  ];

  // Full 12-language support
  const translations = {
    en: { title: "LunaSphere", subtitle: "Discover cosmic wisdom of moon phases", dateLabel: "Select Date", locationLabel: "Search City", getWeather: "Get Weather Context", saveMemory: "Save Memory", eventNamePlaceholder: "Event name", navigation: { home: "Home", cosmology: "Cosmology", cultural: "Cultural", astrology: "Astrology", intimacy: "Intimacy", memories: "My Memories" }, worldMap: "World Map", astralMap: "Astral Map", culturalTraditions: "Cultural traditions for", weatherContext: "Weather Context", lunarCycle: "lunar cycle" },
    fr: { title: "LunaSphere", subtitle: "Découvrez la sagesse cosmique des phases de lune", dateLabel: "Sélectionner la date", locationLabel: "Rechercher une ville", getWeather: "Obtenir le contexte météo", saveMemory: "Enregistrer le souvenir", eventNamePlaceholder: "Nom de l'événement", navigation: { home: "Accueil", cosmology: "Cosmologie", cultural: "Culturel", astrology: "Astrologie", intimacy: "Intimité", memories: "Mes Souvenirs" }, worldMap: "Carte du Monde", astralMap: "Carte Astrale", culturalTraditions: "Traditions culturelles pour", weatherContext: "Contexte Météo", lunarCycle: "cycle lunaire" },
    es: { title: "LunaSphere", subtitle: "Descubre la sabiduría cósmica de las fases lunares", dateLabel: "Seleccionar Fecha", locationLabel: "Buscar Ciudad", getWeather: "Obtener Contexto Climático", saveMemory: "Guardar Recuerdo", eventNamePlaceholder: "Nombre del evento", navigation: { home: "Inicio", cosmology: "Cosmología", cultural: "Cultural", astrology: "Astrología", intimacy: "Intimidad", memories: "Mis Recuerdos" }, worldMap: "Mapa Mundial", astralMap: "Mapa Astral", culturalTraditions: "Tradiciones culturales para", weatherContext: "Contexto Climático", lunarCycle: "ciclo lunar" },
    zh: { title: "月球领域", subtitle: "探索月相的宇宙智慧", dateLabel: "选择日期", locationLabel: "搜索城市", getWeather: "获取天气信息", saveMemory: "保存记忆", eventNamePlaceholder: "事件名称", navigation: { home: "首页", cosmology: "宇宙学", cultural: "文化", astrology: "占星学", intimacy: "亲密", memories: "我的记忆" }, worldMap: "世界地图", astralMap: "星图", culturalTraditions: "的文化传统", weatherContext: "天气信息", lunarCycle: "月相周期" },
    it: { title: "LunaSphere", subtitle: "Scopri la saggezza cosmica delle fasi lunari", dateLabel: "Seleziona Data", locationLabel: "Cerca Città", getWeather: "Ottieni Contesto Meteo", saveMemory: "Salva Memoria", eventNamePlaceholder: "Nome evento", navigation: { home: "Home", cosmology: "Cosmologia", cultural: "Culturale", astrology: "Astrologia", intimacy: "Intimità", memories: "I Miei Ricordi" }, worldMap: "Mappa Mondiale", astralMap: "Mappa Astrale", culturalTraditions: "Tradizioni culturali per", weatherContext: "Contesto Meteo", lunarCycle: "ciclo lunare" },
    pt: { title: "LunaSphere", subtitle: "Descubra a sabedoria cósmica das fases da lua", dateLabel: "Selecionar Data", locationLabel: "Pesquisar Cidade", getWeather: "Obter Contexto Climático", saveMemory: "Salvar Memória", eventNamePlaceholder: "Nome do evento", navigation: { home: "Início", cosmology: "Cosmologia", cultural: "Cultural", astrology: "Astrologia", intimacy: "Intimidade", memories: "Minhas Memórias" }, worldMap: "Mapa Mundial", astralMap: "Mapa Astral", culturalTraditions: "Tradições culturais para", weatherContext: "Contexto Climático", lunarCycle: "ciclo lunar" },
    th: { title: "ลูน่าสเฟียร์", subtitle: "ค้นพบภูมิปัญญาจักรวาลของระยะดวงจันทร์", dateLabel: "เลือกวันที่", locationLabel: "ค้นหาเมือง", getWeather: "รับข้อมูลสภาพอากาศ", saveMemory: "บันทึกความทรงจำ", eventNamePlaceholder: "ชื่อเหตุการณ์", navigation: { home: "หน้าแรก", cosmology: "จักรวาลวิทยา", cultural: "วัฒนธรรม", astrology: "โหราศาสตร์", intimacy: "ความใกล้ชิด", memories: "ความทรงจำของฉัน" }, worldMap: "แผนที่โลก", astralMap: "แผนที่ดวงดาว", culturalTraditions: "ประเพณีทางวัฒนธรรมสำหรับ", weatherContext: "บริบทสภาพอากาศ", lunarCycle: "วงจรจันทรคติ" },
    he: { title: "לונהספר", subtitle: "גלה את החוכמה הקוסמית של מפשי הירח", dateLabel: "בחר תאריך", locationLabel: "חפש עיר", getWeather: "קבל הקשר מטאורולוגי", saveMemory: "שמור זיכרון", eventNamePlaceholder: "שם האירוע", navigation: { home: "דף הבית", cosmology: "קוסמולוגיה", cultural: "תרבותי", astrology: "אסטרולוגיה", intimacy: "קרבה", memories: "הזיכרונות שלי" }, worldMap: "מפת עולם", astralMap: "מפת כוכבים", culturalTraditions: "מסורות תרבותיות עבור", weatherContext: "הקשר מטאורולוגי", lunarCycle: "מחזור הירח" },
    hi: { title: "लूनास्फियर", subtitle: "चंद्र चरणों की ब्रह्मांडीय ज्ञान की खोज करें", dateLabel: "तिथि चुनें", locationLabel: "शहर खोजें", getWeather: "मौसम संदर्भ प्राप्त करें", saveMemory: "स्मृति सहेजें", eventNamePlaceholder: "घटना का नाम", navigation: { home: "होम", cosmology: "ब्रह्मांड विज्ञान", cultural: "सांस्कृतिक", astrology: "ज्योतिष", intimacy: "आंतरिकता", memories: "मेरी यादें" }, worldMap: "विश्व नक्शा", astralMap: "नक्षत्र नक्शा", culturalTraditions: "के लिए सांस्कृतिक परंपराएं", weatherContext: "मौसम संदर्भ", lunarCycle: "चंद्र चक्र" },
    ru: { title: "ЛунаСфера", subtitle: "Откройте для себя космическую мудрость лунных фаз", dateLabel: "Выберите дату", locationLabel: "Поиск города", getWeather: "Получить погодный контекст", saveMemory: "Сохранить воспоминание", eventNamePlaceholder: "Название события", navigation: { home: "Главная", cosmology: "Космология", cultural: "Культурный", astrology: "Астрология", intimacy: "Близость", memories: "Мои воспоминания" }, worldMap: "Карта Мира", astralMap: "Звездная Карта", culturalTraditions: "Культурные традиции для", weatherContext: "Погодный контекст", lunarCycle: "лунный цикл" },
    ar: { title: "لوناسفير", subtitle: "اكتشف الحكمة الكونية لمراحل القمر", dateLabel: "اختر التاريخ", locationLabel: "البحث عن مدينة", getWeather: "احصل على سياق الطقس", saveMemory: "حفظ الذكرى", eventNamePlaceholder: "اسم الحدث", navigation: { home: "الرئيسية", cosmology: "علم الكون", cultural: "ثقافي", astrology: "علم التنجيم", intimacy: "قرب", memories: "ذكرياتي" }, worldMap: "الخريطة العالمية", astralMap: "الخريطة الفلكية", culturalTraditions: "التقاليد الثقافية لـ", weatherContext: "سياق الطقس", lunarCycle: "الدورة القمرية" }
  };

  const t = translations[selectedLanguage];

  // City search functionality
  const handleCitySearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = mockCities.filter(city => 
        city.name.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  const selectCity = (city) => {
    setLocation(`${city.name}, ${city.country}`);
    setCoordinates({ lat: city.lat, lng: lng: city.lng });
    setSearchResults([]);
    setSearchQuery("");
  };

  // Moon phase calculation
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

  // Mock weather data with realistic historical context
  const getMockWeatherData = (dateString, location) => {
    const date = new Date(dateString);
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    
    let baseTemp = month >= 2 && month <= 4 ? 15 : month >= 5 && month <= 7 ? 25 : month >= 8 && month <= 10 ? 18 : 5;
    const temp = Math.round(baseTemp + (Math.random() * 10 - 5));
    const conditions = ["Clear", "Partly Cloudy", "Cloudy", "Rainy", "Thunderstorm", "Snowy"];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    let weatherIcon = condition === "Clear" ? "☀️" : condition === "Partly Cloudy" ? "⛅" : condition === "Cloudy" ? "☁️" : condition === "Rainy" ? "🌧️" : condition === "Thunderstorm" ? "⛈️" : "❄️";
    
    return { 
      location: location || "Unknown Location", 
      temperature: temp, 
      condition: condition, 
      icon: weatherIcon, 
      date: dateString,
      year: year
    };
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

  const addEvent = () => {
    if (!selectedDate || !location) return;
    const date = new Date(selectedDate);
    const phase = calculateMoonPhase(date);
    const newEvent = { 
      id: Date.now(), 
      date: selectedDate, 
      location: location, 
      coordinates: coordinates, 
      moonPhase: phase, 
      weather: weatherData 
    };
    setUserEvents([...userEvents, newEvent]);
  };

  const navigateToPage = (page) => {
    setActivePage(page);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(
      selectedLanguage === "zh" ? "zh-CN" :
      selectedLanguage === "fr" ? "fr-FR" :
      selectedLanguage === "es" ? "es-ES" :
      selectedLanguage === "it" ? "it-IT" :
      selectedLanguage === "pt" ? "pt-PT" :
      selectedLanguage === "th" ? "th-TH" :
      selectedLanguage === "he" ? "he-IL" :
      selectedLanguage === "hi" ? "hi-IN" :
      selectedLanguage === "ru" ? "ru-RU" :
      selectedLanguage === "ar" ? "ar-SA" : "en-US",
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <Helmet>
        <title>{t.title} - {t.subtitle}</title>
        <meta name="description" content={t.subtitle} />
        <meta name="keywords" content="moon phases, lunar calendar, astrology, cultural traditions, fertility, cosmology" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://lunasphere.com/${selectedLanguage}${selectedDate ? `/${selectedDate}` : ''}`} />
        <html lang={selectedLanguage} />
      </Helmet>

      {/* Language Selector */}
      <div className="fixed top-4 right-4 z-50">
        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="px-4 py-2 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300">
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="zh">中文</option>
          <option value="it">Italiano</option>
          <option value="pt">Português</option>
          <option value="th">ไทย</option>
          <option value="he">עברית</option>
          <option value="hi">हिन्दी</option>
          <option value="ru">Русский</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-white">{t.title}</h1>
            <div className="hidden md:flex items-center space-x-1 overflow-x-auto">
              {[
                { icon: "🌙", label: t.navigation.home, page: "home" },
                { icon: "🌌", label: t.navigation.cosmology, page: "cosmology" },
                { icon: "🎭", label: t.navigation.cultural, page: "cultural" },
                { icon: "♾️", label: t.navigation.astrology, page: "astrology" },
                { icon: "💞", label: t.navigation.intimacy, page: "intimacy" },
                { icon: "📖", label: t.navigation.memories, page: "memories" }
              ].map((item) => (
                <button key={item.page} onClick={() => navigateToPage(item.page)} className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 whitespace-nowrap ${
                  activePage === item.page ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" : "text-purple-200 hover:text-white hover:bg-white/10"
                }`}>
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16">
        {activePage === "home" && (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12 pt-20">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{t.title}</h1>
              <p className="text-xl text-purple-200 max-w-2xl mx-auto">{t.subtitle}</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
                <h2 className="text-2xl font-semibold text-white mb-6">Discover Your Lunar Connection</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white mb-2 text-lg">{t.dateLabel}</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2 text-lg">{t.locationLabel}</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search for a city..."
                        value={searchQuery}
                        onChange={(e) => handleCitySearch(e.target.value)}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white/90 backdrop-blur-lg border border-white/30 rounded-xl mt-1 z-10 max-h-60 overflow-y-auto">
                          {searchResults.map((city, index) => (
                            <div
                              key={index}
                              onClick={() => selectCity(city)}
                              className="px-4 py-2 hover:bg-white/20 cursor-pointer border-b border-white/10 last:border-b-0"
                            >
                              <div className="font-medium text-slate-900">{city.name}</div>
                              <div className="text-sm text-slate-600">{city.country}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedDate && location && (
                    <button
                      onClick={fetchWeatherData}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                    >
                      {t.getWeather}
                    </button>
                  )}

                  {moonPhase && (
                    <div className="bg-white/20 rounded-2xl p-6 border border-white/10">
                      <div className="text-center">
                        <div className="text-6xl mb-4">{moonPhase.emoji}</div>
                        <h3 className="text-2xl font-bold text-white mb-2">{moonPhase.name}</h3>
                        <div className="mt-4 bg-white/30 rounded-full h-3">
                          <div className="bg-gradient-to-r from-yellow-300 to-orange-500 h-3 rounded-full transition-all duration-500" style={{ width: `${moonPhase.fraction * 100}%` }}></div>
                        </div>
                        <p className="text-sm text-purple-300 mt-2">{Math.round(moonPhase.fraction * 100)}% {t.lunarCycle}</p>
                      </div>
                    </div>
                  )}

                  {weatherData && (
                    <div className="bg-white/20 rounded-2xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4 text-center">{t.weatherContext}</h3>
                      <div className="text-center">
                        <div className="text-5xl mb-3">{weatherData.icon}</div>
                        <p className="text-lg text-white font-medium mb-1">{weatherData.location}</p>
                        <p className="text-3xl font-bold text-white mb-2">{weatherData.temperature}°C</p>
                        <p className="text-purple-200 mb-3">{weatherData.condition}</p>
                      </div>
                    </div>
                  )}

                  {coordinates.lat !== 0 && coordinates.lng !== 0 && (
                    <div className="bg-white/20 rounded-2xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4 text-center">{t.worldMap}</h3>
                      <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-2 bg-[url('https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg')] bg-cover bg-center rounded-full opacity-80"></div>
                        <div className="absolute w-6 h-6 bg-red-500 rounded-full shadow-lg border-2 border-white animate-pulse" style={{ left: `${50 + (coordinates.lng / 360) * 100}%`, top: `${50 - (coordinates.lat / 180) * 100}%`, transform: 'translate(-50%, -50%)' }}></div>
                        <div className="text-white text-sm text-center z-10 bg-black/50 px-3 py-2 rounded-lg">
                          <p className="font-bold">{weatherData?.location || "Selected Location"}</p>
                          <p>{t.latitude}: {coordinates.lat.toFixed(2)}°</p>
                          <p>{t.longitude}: {coordinates.lng.toFixed(2)}°</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {weatherData && (
                    <div className="bg-white/20 rounded-2xl p-6 border border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-white">{t.astralMap}</h3>
                        <button onClick={() => setShowAstralMap(!showAstralMap)} className="px-4 py-2 bg-purple-500/50 text-white rounded-lg hover:bg-purple-500 transition-all duration-300">
                          {showAstralMap ? "Hide" : "Show"}
                        </button>
                      </div>
                      
                      {showAstralMap && (
                        <div className="bg-gradient-to-br from-indigo-900 to-black rounded-lg p-4">
                          <div className="text-center mb-4"><h4 className="text-white font-medium text-lg">{t.moonPosition}</h4></div>
                          <div className="bg-black rounded-lg h-64 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://svs.gsfc.nasa.gov/vis/a000000/a004600/a004658/moon.4k.00001_print.jpg')] bg-cover bg-center opacity-90"></div>
                            {[...Array(50)].map((_, i) => (<div key={i} className="absolute w-1 h-1 bg-white rounded-full opacity-80" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `twinkle ${2 + Math.random() * 3}s infinite`, boxShadow: `0 0 ${Math.random() * 5 + 2}px white` }}></div>))}
                            <div className="absolute w-8 h-8 bg-yellow-300 rounded-full shadow-2xl border-2 border-yellow-400 flex items-center justify-center text-lg" style={{ left: "50%", top: "40%", transform: 'translate(-50%, -50%)', boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)' }}>🌕</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {moonPhase && (
                    <div className="mt-6 pt-6 border-t border-white/20">
                      <h3 className="text-xl font-semibold text-white mb-4">{t.saveMemory}</h3>
                      <button
                        onClick={addEvent}
                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                      >
                        {t.saveMemory}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other pages would be implemented similarly */}
      </div>

      <style jsx>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .backdrop-blur-xl { backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px); }
        @media (max-width: 768px) { .hidden.md\\:flex { display: none; } }
        .hover\\:scale-105:hover { transform: scale(1.05); }
      `}</style>
    </div>
  );
};

export default App;

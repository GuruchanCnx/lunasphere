import React from 'react';

const Navigation = ({ activePage, setActivePage, selectedLanguage, setSelectedLanguage, translations }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-white">{translations.title}</h1>
          
          <div className="flex items-center space-x-4">
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-1 bg-white/20 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="zh">中文</option>
            </select>
            
            <div className="hidden md:flex items-center space-x-1">
              {[
                { icon: "🌙", label: translations.navigation.home, page: "home" },
                { icon: "🌌", label: translations.navigation.cosmology, page: "cosmology" },
                { icon: "🎭", label: translations.navigation.cultural, page: "cultural" },
                { icon: "♾️", label: translations.navigation.astrology, page: "astrology" },
                { icon: "💞", label: translations.navigation.intimacy, page: "intimacy" },
                { icon: "📖", label: translations.navigation.memories, page: "memories" }
              ].map((item) => (
                <button 
                  key={item.page} 
                  onClick={() => setActivePage(item.page)} 
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1 ${
                    activePage === item.page 
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-navy-900 shadow-lg" 
                      : "text-yellow-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

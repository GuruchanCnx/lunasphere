import React from 'react';

const CulturalTraditions = ({ moonPhase, translations }) => {
  const traditions = {
    "New Moon": [
      {
        culture: "Hindu",
        tradition: "Amavasya - A day for honoring ancestors and performing rituals for peace and prosperity",
        image: "https://images.unsplash.com/photo-1564415782947-595ec463004a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        culture: "Native American", 
        tradition: "Time for new beginnings and setting intentions for the coming cycle",
        image: "https://images.unsplash.com/photo-1548860711-70129e561a2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "Full Moon": [
      {
        culture: "Buddhist",
        tradition: "Uposatha - A day of renewed commitment to spiritual practices", 
        image: "https://images.unsplash.com/photo-1547370396-2900855259e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        culture: "Thai",
        tradition: "Wan Phen - A time for making merit and offering alms to monks",
        image: "https://images.unsplash.com/photo-1622595615467-ac9245892263?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ]
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
      <h3 className="text-2xl font-semibold text-white mb-6 text-center">
        {translations.culturalTraditions || "Cultural traditions for"} {moonPhase.name}
      </h3>
      <div className="grid gap-6">
        {traditions[moonPhase.name]?.map((tradition, index) => (
          <div key={index} className="bg-white/20 rounded-xl p-6 border border-white/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <h4 className="text-xl font-bold text-white">{tradition.culture}</h4>
            </div>
            <img 
              src={tradition.image} 
              alt={tradition.culture} 
              className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
            />
            <p className="text-yellow-200 text-lg">{tradition.tradition}</p>
          </div

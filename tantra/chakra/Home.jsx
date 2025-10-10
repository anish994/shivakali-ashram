import React, { useEffect, useState } from 'react';
import ChakraWheel from '../components/ChakraWheel';
import { Sparkles, Zap, Eye, Heart, MessageCircle, Brain, Crown, Flame } from 'lucide-react';
import { chakrasData, cosmicWisdom } from '../mock';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const icons = [Flame, Zap, Sparkles, Heart, MessageCircle, Eye, Crown];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-90" />
        
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            className="transform transition-transform duration-1000"
            style={{ transform: `translateY(-${scrollY * 0.3}px)` }}
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
              Chakra Technologies
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-400 mb-8 max-w-4xl mx-auto">
              Ancient Tantric Wisdom Meets Consciousness Engineering
            </p>
            <p className="text-base sm:text-lg text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
              Access rare esoteric knowledge from hidden tantric texts. Discover activation protocols, 
              advanced siddhis, and secret techniques preserved by masters across millennia. 
              This is not basic chakra information—this is the deep web of spiritual technology.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <div className="px-6 py-3 bg-gray-800 rounded-lg border border-gray-700">
                <span className="text-2xl font-bold text-white">7</span>
                <span className="text-gray-400 ml-2">Energy Centers</span>
              </div>
              <div className="px-6 py-3 bg-gray-800 rounded-lg border border-gray-700">
                <span className="text-2xl font-bold text-white">108</span>
                <span className="text-gray-400 ml-2">Day Protocols</span>
              </div>
              <div className="px-6 py-3 bg-gray-800 rounded-lg border border-gray-700">
                <span className="text-2xl font-bold text-white">72K</span>
                <span className="text-gray-400 ml-2">Nadis System</span>
              </div>
            </div>

            {/* Cosmic Energy Wheel */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-gray-300">The Cosmic Energy Wheel</h2>
              <ChakraWheel />
              <p className="text-gray-500 mt-8 text-sm">Click any chakra to explore its mysteries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-white">
            Seven Gates to Infinite Consciousness
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chakrasData.map((chakra, index) => {
              const Icon = icons[index];
              return (
                <div
                  key={chakra.id}
                  className="group relative bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
                  onClick={() => window.location.href = `/chakra/${chakra.id}`}
                  style={{
                    boxShadow: `0 4px 20px ${chakra.color}20`,
                  }}
                >
                  <div 
                    className="absolute top-0 left-0 w-2 h-full rounded-l-2xl"
                    style={{ backgroundColor: chakra.color }}
                  />
                  
                  <div className="flex items-start space-x-4 mb-4">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${chakra.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: chakra.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{chakra.name}</h3>
                      <p className="text-sm text-gray-400">{chakra.commonName}</p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {chakra.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                      {chakra.element}
                    </span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                      {chakra.mantra}
                    </span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                      {chakra.petals} petals
                    </span>
                  </div>

                  <div className="text-gray-500 text-xs">
                    Location: {chakra.location}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wisdom Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Essential Wisdom</h2>
          
          <div className="space-y-6">
            <div className="bg-black border border-red-900/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Kundalini Warning
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {cosmicWisdom.kundaliniWarning}
              </p>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-300 mb-3 flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Integration Note
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {cosmicWisdom.integrationNote}
              </p>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-300 mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Secret Practice
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {cosmicWisdom.secretPractice}
              </p>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-300 mb-3 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Siddhi Warning
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {cosmicWisdom.sidddhiWarning}
              </p>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-300 mb-3 flex items-center">
                <Crown className="w-5 h-5 mr-2" />
                Guru Principle
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {cosmicWisdom.guruPrinciple}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm mb-2">
            ॐ Chakra Technologies - Ancient Wisdom, Modern Interface
          </p>
          <p className="text-gray-600 text-xs">
            For educational purposes only. Always practice under qualified guidance.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .text-shadow {
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Home;
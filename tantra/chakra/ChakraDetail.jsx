import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chakrasData } from '../mock';
import { ChevronLeft, ChevronRight, Activity, AlertCircle, BookOpen, Sparkles, Zap, Lock } from 'lucide-react';

const ChakraDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const chakra = chakrasData.find(c => c.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!chakra) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Chakra not found</div>;
  }

  const prevChakra = parseInt(id) > 1 ? parseInt(id) - 1 : null;
  const nextChakra = parseInt(id) < 7 ? parseInt(id) + 1 : null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'activation', label: 'Activation', icon: Zap },
    { id: 'advanced', label: 'Advanced', icon: Sparkles },
    { id: 'secrets', label: 'Hidden Wisdom', icon: Lock }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Header */}
      <div 
        className="relative py-20 border-b border-gray-900"
        style={{
          background: `linear-gradient(135deg, ${chakra.color}15 0%, transparent 100%)`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            {prevChakra && (
              <button
                onClick={() => navigate(`/chakra/${prevChakra}`)}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                <span className="text-sm">Previous</span>
              </button>
            )}
            <div className="flex-1" />
            {nextChakra && (
              <button
                onClick={() => navigate(`/chakra/${nextChakra}`)}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-sm">Next</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>

          <div className="flex flex-col items-center text-center">
            <div 
              className="w-24 h-24 rounded-full mb-6 flex items-center justify-center text-white font-bold text-3xl shadow-2xl"
              style={{
                backgroundColor: chakra.color,
                boxShadow: `0 0 60px ${chakra.color}60`
              }}
            >
              {chakra.mantra}
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-white">
              {chakra.name}
            </h1>
            <p className="text-2xl text-gray-400 mb-6">{chakra.commonName}</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="px-4 py-2 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-xs text-gray-500">Element:</span>
                <span className="text-white ml-2 font-semibold">{chakra.element}</span>
              </div>
              <div className="px-4 py-2 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-xs text-gray-500">Frequency:</span>
                <span className="text-white ml-2 font-semibold">{chakra.frequency}</span>
              </div>
              <div className="px-4 py-2 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-xs text-gray-500">Deity:</span>
                <span className="text-white ml-2 font-semibold">{chakra.deity}</span>
              </div>
              <div className="px-4 py-2 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-xs text-gray-500">Animal:</span>
                <span className="text-white ml-2 font-semibold">{chakra.animal}</span>
              </div>
            </div>

            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              {chakra.description}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-white text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Deep Knowledge */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-white flex items-center">
                <BookOpen className="w-8 h-8 mr-3" style={{ color: chakra.color }} />
                Deep Esoteric Knowledge
              </h2>
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {chakra.deepKnowledge}
                </p>
              </div>
            </section>

            {/* Location & Properties */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-white">Chakra Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 text-gray-300">Physical Location</h3>
                  <p className="text-gray-400">{chakra.location}</p>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 text-gray-300">Planetary Influence</h3>
                  <p className="text-gray-400">{chakra.planetaryInfluence}</p>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 text-gray-300">Lotus Petals</h3>
                  <p className="text-gray-400">{chakra.petals} petals - each containing specific seed syllables</p>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 text-gray-300">Bija Mantra</h3>
                  <p className="text-gray-400 text-3xl font-bold" style={{ color: chakra.color }}>
                    {chakra.mantra}
                  </p>
                </div>
              </div>
            </section>

            {/* Blockage Signs */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-white flex items-center">
                <AlertCircle className="w-8 h-8 mr-3 text-red-500" />
                Signs of Blockage
              </h2>
              <div className="bg-gray-900 rounded-xl p-8 border border-red-900/30">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chakra.blockageSigns.map((sign, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'activation' && (
          <div className="space-y-12">
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-8 border border-gray-800 mb-8">
              <h2 className="text-3xl font-bold mb-4 text-white">108-Day Activation Protocol</h2>
              <p className="text-gray-400 text-lg">
                This systematic approach is designed for gradual, safe awakening. Each phase builds upon the previous, 
                preparing your energy body for profound transformation.
              </p>
            </div>

            {/* Phase 1 */}
            <section>
              <div className="flex items-center mb-6">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4"
                  style={{ backgroundColor: chakra.color }}
                >
                  1
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{chakra.activationProtocol.phase1.title}</h2>
                  <p className="text-gray-500">Foundation building phase</p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <ul className="space-y-6">
                  {chakra.activationProtocol.phase1.techniques.map((technique, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mt-1"
                        style={{ backgroundColor: `${chakra.color}80` }}
                      >
                        {index + 1}
                      </div>
                      <p className="text-gray-300 leading-relaxed flex-1">{technique}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Phase 2 */}
            <section>
              <div className="flex items-center mb-6">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4"
                  style={{ backgroundColor: chakra.color }}
                >
                  2
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{chakra.activationProtocol.phase2.title}</h2>
                  <p className="text-gray-500">Deepening and intensification</p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <ul className="space-y-6">
                  {chakra.activationProtocol.phase2.techniques.map((technique, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mt-1"
                        style={{ backgroundColor: `${chakra.color}80` }}
                      >
                        {index + 1}
                      </div>
                      <p className="text-gray-300 leading-relaxed flex-1">{technique}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Phase 3 */}
            <section>
              <div className="flex items-center mb-6">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4"
                  style={{ backgroundColor: chakra.color }}
                >
                  3
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{chakra.activationProtocol.phase3.title}</h2>
                  <p className="text-gray-500">Integration and mastery</p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <ul className="space-y-6">
                  {chakra.activationProtocol.phase3.techniques.map((technique, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mt-1"
                        style={{ backgroundColor: `${chakra.color}80` }}
                      >
                        {index + 1}
                      </div>
                      <p className="text-gray-300 leading-relaxed flex-1">{technique}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-12">
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-8 border border-yellow-900/30 mb-8">
              <div className="flex items-start space-x-4">
                <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-yellow-500 mb-2">Advanced Practitioners Only</h3>
                  <p className="text-gray-400">
                    These techniques require substantial preparation and should only be attempted after mastering 
                    the basic 108-day protocol. Guru guidance is essential.
                  </p>
                </div>
              </div>
            </div>

            <section>
              <h2 className="text-3xl font-bold mb-8 text-white flex items-center">
                <Sparkles className="w-8 h-8 mr-3" style={{ color: chakra.color }} />
                Advanced Techniques & Siddhis
              </h2>
              <div className="space-y-6">
                {chakra.advancedTechniques.map((technique, index) => (
                  <div 
                    key={index}
                    className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-gray-700 transition-all"
                  >
                    <div className="flex items-start space-x-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                        style={{ backgroundColor: chakra.color }}
                      >
                        {index + 1}
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg flex-1">{technique}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'secrets' && (
          <div className="space-y-12">
            <div className="relative bg-gradient-to-r from-black via-gray-900 to-black rounded-xl p-8 border border-gray-800 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial opacity-10"
                style={{ background: `radial-gradient(circle, ${chakra.color} 0%, transparent 70%)` }}
              />
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <Lock className="w-10 h-10 mr-4" style={{ color: chakra.color }} />
                  <h2 className="text-4xl font-bold text-white">Hidden Wisdom</h2>
                </div>
                <p className="text-gray-400 text-lg mb-6">
                  Knowledge passed down through oral tradition, found only in rare tantric texts and revealed by realized masters.
                </p>
                <div className="bg-black/50 rounded-lg p-8 border border-gray-800">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {chakra.hiddenWisdom}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {prevChakra ? (
              <button
                onClick={() => navigate(`/chakra/${prevChakra}`)}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Previous Chakra</div>
                  <div className="font-semibold">{chakrasData[prevChakra - 1].name}</div>
                </div>
              </button>
            ) : (
              <div />
            )}
            
            {nextChakra ? (
              <button
                onClick={() => navigate(`/chakra/${nextChakra}`)}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="text-right">
                  <div className="text-xs text-gray-500">Next Chakra</div>
                  <div className="font-semibold">{chakrasData[nextChakra - 1].name}</div>
                </div>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChakraDetail;
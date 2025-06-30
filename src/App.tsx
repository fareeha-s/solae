import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import Lottie from 'lottie-react';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Load the Lottie animation
    fetch('https://lottie.host/6107967e-edbf-4c5e-847f-31ad865c2ce2/jIlxqxcMor.lottie')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.log('Animation loading failed:', error));
  }, []);

  const tools = [
    'Notion', 'Zapier', 'Stripe', 'Google Workspace', 'Teachable', 
    'GetResponse', 'Calendly', 'Framer', 'Wise', 'Webflow',
    'Notion', 'Zapier', 'Stripe', 'Google Workspace', 'Teachable', 
    'GetResponse', 'Calendly', 'Framer', 'Wise', 'Webflow'
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col">
      {/* Lottie Animation Background */}
      {animationData && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-full h-full max-w-4xl max-h-4xl opacity-30">
            <Lottie 
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <header className={`relative z-10 flex justify-end items-center p-6 md:p-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-400 border border-gray-800 rounded-lg hover:border-orange-500 hover:text-white transition-all duration-300 group">
          <span className="text-sm font-light">Learn More</span>
          <ExternalLink size={16} className="group-hover:text-orange-400 transition-colors" />
        </button>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 md:px-8 relative z-10">
        <div className={`text-center transition-all duration-1200 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Centered Solae Logo */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight text-white mb-8 tracking-wider group cursor-pointer">
            Solae<span className="text-orange-400">.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base md:text-lg text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            Independent operations consultancy helping lean teams delegate smarter, 
            automate faster, and scale sustainably.
          </p>
          
          {/* CTA Button */}
          <button className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-light text-white border border-gray-700 rounded-lg hover:border-orange-500 hover:shadow-orange-500/20 hover:shadow-lg transition-all duration-300">
            <span className="relative z-10">Explore Our Stack</span>
          </button>
        </div>
      </main>

      {/* Trusted Tools Section */}
      <footer className={`relative z-10 pb-8 md:pb-12 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="text-center px-6 md:px-8">
          <p className="text-gray-600 text-xs mb-6 tracking-widest font-light">BUILT WITH TOOLS TRUSTED BY 100,000+ TEAMS</p>
          
          {/* Scrolling Tools Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left whitespace-nowrap">
              {tools.map((tool, index) => (
                <div 
                  key={`${tool}-${index}`}
                  className="text-gray-500 text-sm font-light hover:text-gray-300 transition-colors duration-300 cursor-default mx-4 md:mx-6 flex-shrink-0"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
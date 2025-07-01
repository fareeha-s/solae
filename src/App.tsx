import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import teamPhoto from './assets/solae_team_photo.jpg';

// Favicon SVG as a React component
const FaviconIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle' }}>
    <circle cx="50" cy="50" r="45" fill="none" stroke="#E6C15B" strokeWidth="4" />
    <circle cx="50" cy="50" r="20" fill="#E6C15B" />
  </svg>
);

// Gold Chevron Button - more minimal and elegant
const GoldChevron = ({ direction, disabled, onClick }: { direction: 'left' | 'right', disabled: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === 'left' ? 'Previous service' : 'Next service'}
    className={`group flex items-center justify-center transition-all duration-300
      ${disabled ? 'opacity-0 pointer-events-none' : 'hover:opacity-90 cursor-pointer'}`}
  >
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E6C15B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={`transition-transform duration-200 ${!disabled && 'group-hover:scale-110'}`}
    >
      {direction === 'left' ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 6 15 12 9 18" />
      )}
    </svg>
  </button>
);

// Subtle home button component (no fade-in)
const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="text-[#E6C15B] opacity-40 hover:opacity-100 transition-opacity duration-200 mt-8 text-sm tracking-wider uppercase"
  >
    home
  </button>
);

function App() {
  console.log("App loaded");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showOrb, setShowOrb] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [overlay, setOverlay] = useState<null | 'about' | 'services' | 'privacy'>(null);

  // Carousel state for services
  const [serviceIndex, setServiceIndex] = useState(0);
  const services = [
    {
      title: 'AI-Powered Growth & Outreach',
      text: 'We design and execute targeted growth campaigns using <strong>AI-driven lead generation</strong> and <strong>automated outreach sequences</strong>. This includes identifying high-value affiliate partnerships, building compliant cold email campaigns, and creating conversion-focused messaging that drives <strong>measurable results</strong> for strategic business development.'
    },
    {
      title: 'Automation & Integration',
      text: 'We build and maintain <strong>automated systems</strong> for onboarding, billing, and reporting that keep your SaaS or agency running smoothly. Our team designs <strong>custom Zapier/Make/API flows</strong> connecting your Stripe, Notion, Google Workspace, and other tools—then <strong>monitors and optimizes</strong> them as you scale.'
    },
    {
      title: 'Digital Presence',
      text: 'We design and build websites and dashboards using <strong>modern development tools</strong> that deliver exceptional performance and user experience. We specialize in converting <strong>Framer prototypes</strong> and subscription-based sites into <strong>production-ready platforms</strong> that you can fully own, maintain independently, and scale with confidence—eliminating ongoing platform fees.'
    }
  ];

  // Touch handling for carousel
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.changedTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEndX(e.changedTouches[0].clientX);
  const handleTouchEnd = () => {
    const swipeDistance = touchStartX - touchEndX;
    const swipeThreshold = window.innerWidth * 0.15; // 15% of screen width
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0 && serviceIndex < services.length - 1) {
        setServiceIndex(serviceIndex + 1);
      } else if (swipeDistance < 0 && serviceIndex > 0) {
        setServiceIndex(serviceIndex - 1);
      }
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  // Mouse drag for desktop carousel
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseStartX, setMouseStartX] = useState(0);
  const [mouseEndX, setMouseEndX] = useState(0);
  const handleMouseDown = (e: React.MouseEvent) => { 
    setMouseDown(true); 
    setMouseStartX(e.clientX);
    setMouseEndX(e.clientX);
  };
  const handleMouseMove = (e: React.MouseEvent) => { 
    if (mouseDown) setMouseEndX(e.clientX);
  };
  const handleMouseUp = () => {
    if (mouseDown) {
      const swipeDistance = mouseStartX - mouseEndX;
      const swipeThreshold = window.innerWidth * 0.15; // 15% of screen width

      if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0 && serviceIndex < services.length - 1) {
          setServiceIndex(serviceIndex + 1);
        } else if (swipeDistance < 0 && serviceIndex > 0) {
          setServiceIndex(serviceIndex - 1);
        }
      }
    }
    setMouseDown(false);
    setMouseStartX(0);
    setMouseEndX(0);
  };

  // Navigation functions for services carousel
  const goToPrevService = () => serviceIndex > 0 && setServiceIndex(serviceIndex - 1);
  const goToNextService = () => serviceIndex < services.length - 1 && setServiceIndex(serviceIndex + 1);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    // Fade in content after a delay
    const contentTimer = setTimeout(() => setShowContent(true), 900);
    // Fade in the orb after a short delay
    const orbTimer = setTimeout(() => setShowOrb(true), 700);
    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
      clearTimeout(orbTimer);
    };
  }, []);

  const tools = [
    'Notion', 'Zapier', 'Stripe', 'Google Workspace', 'Slack', 
    'Cursor', 'Calendly', 'Framer', 'Bolt', 'Claude',
    'Airtable', 'Lovable', 'ChatGPT', 'Microsoft Office Suite',
    'Notion', 'Zapier', 'Stripe', 'Google Workspace', 'Slack', 
    'Cursor', 'Calendly', 'Framer', 'Bolt', 'Claude',
    'Airtable', 'Lovable', 'ChatGPT', 'Microsoft Office Suite'
  ];

  return (
    <div className="min-h-screen bg-[#120c07] relative overflow-hidden flex flex-col">
      {/* Subtle dark gold ring effect for hero background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-radial from-yellow-900/10 via-yellow-900/20 to-[#120c07] opacity-90" />
      {/* Small dark orb behind logo, appears after delay */}
      {showOrb && (
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          <div className="w-[8vw] h-[8vw] md:w-[7vw] md:h-[4vw] rounded-full bg-yellow-900 opacity-10 blur-3xl border-4 border-yellow-900" />
        </div>
      )}

      {/* Top Navigation */}
      <header className={`relative z-10 flex items-center justify-between p-6 md:p-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 md:px-8 relative z-10">
        <div className={`text-center transition-all duration-1200 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Centered Solae Logo */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight text-white mb-2 md:mb-4 tracking-wider group lowercase">
            <span className="dm-serif" style={{
              textShadow: '0 0 8px #E6C15B88, 0 0 2px #E6C15B44'
            }}>solae</span>
            <span className="inline-block align-middle ml-2"><FaviconIcon /></span>
          </h1>
          
          {/* Subheadline and CTA Button fade in */}
          <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-base md:text-lg mb-4 md:mb-6 leading-relaxed max-w-2xl mx-auto font-light tracking-widest" style={{ color: '#F5E9C8', letterSpacing: '0.1em' }}>
              Your trusted boutique operations partner, helping lean teams delegate smarter, automate seamlessly, and scale sustainably.
            </p>
            <a
              href="mailto:hello@solae.app"
              className="dm-serif group relative inline-flex items-center justify-center px-5 py-2 text-base font-medium text-white border-2 border-white/60 rounded-2xl bg-[#E6C15B] shadow-lg shadow-[#E6C15B]/40 hover:bg-[#18120b] hover:text-[#E6C15B] hover:border-[#E6C15B] hover:shadow-[#E6C15B]/40 hover:scale-[1.04] active:scale-95 transition-all duration-200 lowercase focus:outline-none focus:ring-2 focus:ring-[#E6C15B]"
            >
              <span className="relative z-10 tracking-wide">work with us</span>
            </a>
          </div>
        </div>
      </main>

      {/* Trusted Tools Section */}
      <footer className={`relative z-10 pb-8 md:pb-12 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center px-6 md:px-8">
          <p className="text-gray-400 text-xs mb-6 tracking-widest font-light uppercase">Experts on tools trusted by 100,000+ teams.</p>
          
          {/* Scrolling Tools Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left whitespace-nowrap">
              {tools.map((tool, index) => (
                <div 
                  key={`${tool}-${index}`}
                  className="text-gray-400 text-sm font-light hover:text-gray-200 transition-colors duration-300 cursor-default mx-4 md:mx-6 flex-shrink-0"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-[10px] md:text-xs text-gray-500 tracking-widest font-light">© {new Date().getFullYear()} Solae. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <button onClick={() => setOverlay('about')} className="hover:text-gray-300 transition-colors uppercase tracking-widest">ABOUT</button>
            <button onClick={() => setOverlay('services')} className="hover:text-gray-300 transition-colors uppercase tracking-widest">SERVICES</button>
            <button onClick={() => setOverlay('privacy')} className="hover:text-gray-300 transition-colors uppercase tracking-widest">PRIVACY POLICY</button>
            <a href="mailto:hello@solae.app" className="hover:text-gray-300 transition-colors uppercase tracking-widest">CONTACT</a>
          </div>
        </div>
      </footer>

      {/* Overlay for About/Services with Framer Motion */}
      <AnimatePresence>
        {overlay && (
          <motion.div
            key="overlay-bg"
            className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-[#120c07] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setOverlay(null)}
          >
            {/* Subtle dark gold ring effect for overlay background */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-radial from-yellow-900/10 via-yellow-900/20 to-[#120c07] opacity-90" />
            {/* Small dark orb behind content */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
              <div className="w-[8vw] h-[8vw] md:w-[7vw] md:h-[4vw] rounded-full bg-yellow-900 opacity-10 blur-3xl border-4 border-yellow-900" />
            </div>
            <motion.div
              className="flex flex-col items-center max-w-full md:max-w-5xl w-full mx-0 md:mx-4 relative z-10 overflow-y-auto overflow-x-hidden max-h-[90vh] p-1 md:p-4 hide-scrollbar"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {overlay === 'about' && (
                <div className="w-full max-w-5xl mx-auto flex flex-col px-4 items-center">
                  <h2 className="text-3xl md:text-4xl mb-4 text-white text-center dm-serif lowercase font-light flex items-center justify-center" style={{ textShadow: '0 0 8px #E6C15B88, 0 0 2px #E6C15B44' }}>
                    about
                    <span className="inline-block align-middle ml-2"><FaviconIcon size={18} /></span>
                  </h2>
                  <div className="w-full flex flex-col md:flex-row items-center gap-12 mt-8 max-w-7xl mx-auto">
                    {/* Left Column: Photo */}
                    <div className="w-full md:w-5/12">
                      <div className="w-full rounded-xl shadow-[0_0_15px_2px_#E6C15B15]">
                        <img 
                          src={teamPhoto}
                          alt="Solae Team" 
                          className="rounded-xl w-full h-auto"
                        />
                      </div>
                    </div>
                    {/* Right Column: Text */}
                    <div className="w-full md:w-7/12 flex flex-col justify-center space-y-8">
                      {/* Lead paragraph with larger text */}
                      <p className="text-xl md:text-2xl font-light text-left leading-relaxed" style={{ color: '#F5E9C8' }}>
                        Solae is a boutique consultancy founded by technologists at leading <strong>FAANG companies</strong> who build <strong>growth and automation systems</strong> using AI tools in a <strong>fraction of traditional time.</strong>
                      </p>
                      
                      {/* Secondary paragraphs with smaller text and more spacing */}
                      <div className="space-y-6">
                        <p className="text-base md:text-lg font-light text-left leading-relaxed opacity-90" style={{ color: '#F5E9C8' }}>
                          What started as side projects for founder friends across North America became a full consultancy when we saw the dramatic results we could deliver. Our small team includes members from <strong>MIT, UPenn, and UBC</strong> who've built proven systems at the world's largest tech platforms.
                        </p>
                        
                        <p className="text-sm font-light text-left leading-relaxed opacity-80" style={{ color: '#F5E9C8' }}>
                          If you have unique talent to bring to our team, we're always looking for more exceptional people. <a href="mailto:hello@solae.app" className="text-white hover:opacity-80">Send us a note</a>.
                        </p>
                      </div>
                    </div>
                  </div>
                  <CloseButton onClick={() => setOverlay(null)} />
                </div>
              )}
              {overlay === 'services' && (
                <div className="w-full max-w-5xl mx-auto flex flex-col px-4 items-center">
                  <h2 className="text-3xl md:text-4xl mb-6 text-white text-center dm-serif lowercase font-light flex items-center justify-center" style={{ textShadow: '0 0 8px #E6C15B88, 0 0 2px #E6C15B44' }}>
                    services
                    <span className="inline-block align-middle ml-2"><FaviconIcon size={18} /></span>
                  </h2>
                  {/* Desktop: show all services in boxes */}
                  <div className="hidden md:grid grid-cols-3 gap-8 w-full mt-8 px-4">
                    {services.map((svc, idx) => (
                      <div key={svc.title} className="rounded-2xl bg-[#18120b]/70 border border-[#E6C15B22] shadow-[0_2px_24px_0_#E6C15B1A] p-6 flex flex-col items-start">
                        <h3 className="text-xl font-bold dm-serif text-white mb-3" style={{textShadow:'0 0 6px #E6C15B33'}}>{svc.title}</h3>
                        <p className="text-sm font-light text-left mb-4" style={{color:'#F5E9C8',letterSpacing:'0.01em'}} dangerouslySetInnerHTML={{ __html: svc.text }}></p>
                        {idx === 1 && (
                          <blockquote className="italic text-[#E6C15B] text-sm text-left mb-0 font-serif border-l-2 border-[#E6C15B44] pl-3 mt-auto">
                            "Solae's integration of our Airtable and internal tools was a game-changer. It saved our team countless hours and gave us real-time visibility that we never thought possible."
                            <br/>
                            <span className="not-italic text-xs text-[#F5E9C8] block mt-2">
                              — <a href="https://www.linkedin.com/company/global-entrepreneurs-hub/" target="_blank" rel="noopener noreferrer" className="text-[#F5E9C8] hover:opacity-80">Founder of GLO</a>
                            </span>
                          </blockquote>
                        )}
                        {idx === 0 && (
                          <div className="mt-auto grid grid-cols-2 gap-4 text-center pt-4 border-t border-[#E6C15B22] max-w-sm mx-auto w-full">
                            <div>
                              <div className="text-[#E6C15B] text-lg font-bold">3x</div>
                              <div className="text-[#F5E9C8] text-xs opacity-80">Lead Generation</div>
                            </div>
                            <div>
                              <div className="text-[#E6C15B] text-lg font-bold">85%</div>
                              <div className="text-[#F5E9C8] text-xs opacity-80">Response Rate</div>
                            </div>
                          </div>
                        )}
                        {idx === 2 && (
                          <div className="mt-auto grid grid-cols-2 gap-4 text-center pt-4 border-t border-[#E6C15B22] max-w-sm mx-auto w-full">
                            <div>
                              <div className="text-[#E6C15B] text-lg font-bold">2s</div>
                              <div className="text-[#F5E9C8] text-xs opacity-80">Load Time</div>
                            </div>
                            <div>
                              <div className="text-[#E6C15B] text-lg font-bold">99</div>
                              <div className="text-[#F5E9C8] text-xs opacity-80">Performance Score</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile: keep carousel */}
                  <div className="md:hidden w-full px-4">
                    <div className="w-full flex flex-col items-center select-none" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} style={{ cursor: 'grab', userSelect: 'none' }}>
                      <div className="mb-8 w-full max-w-2xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-light text-white text-center select-none dm-serif mb-6" style={{textShadow:'0 0 8px #E6C15B55, 0 0 2px #E6C15B33',letterSpacing:'0.02em'}}>{services[serviceIndex].title}</h3>
                        <p className="text-base md:text-lg font-light leading-relaxed mb-4 text-center max-w-xl mx-auto" style={{color:'#F5E9C8',letterSpacing:'0.1em'}} dangerouslySetInnerHTML={{ __html: services[serviceIndex].text }}></p>
                        {serviceIndex === 1 && (
                          <blockquote className="italic text-[#E6C15B] text-base md:text-lg text-center mb-6 max-w-lg mx-auto font-serif">
                            "Solae's integration of our Airtable and internal tools was a game-changer. It saved our team countless hours and gave us real-time visibility that we never thought possible."
                            <br/>
                            <span className="not-italic text-xs text-[#F5E9C8] block mt-2">
                              — <a href="https://www.linkedin.com/company/global-entrepreneurs-hub/" target="_blank" rel="noopener noreferrer" className="text-[#F5E9C8] hover:opacity-80">Founder of GLO</a>
                            </span>
                          </blockquote>
                        )}
                        {serviceIndex === 0 && (
                          <div className="grid grid-cols-2 gap-4 text-center pt-4 border-t border-[#E6C15B22] max-w-sm mx-auto w-full">
                            <div>
                              <div className="text-[#E6C15B] text-lg font-bold">3x</div>
                              <div className="text-[#F5E9C8] text-xs opacity-80">Lead Generation</div>
                            </div>
                            <div>
                              <div className="text-[#E6C15B] text-lg font-bold">85%</div>
                              <div className="text-[#F5E9C8] text-xs opacity-80">Response Rate</div>
                            </div>
                          </div>
                        )}
                        {serviceIndex === 2 && (
                          <div className="grid grid-cols-2 gap-4 text-center pt-4 border-t border-[#E6C15B22] max-w-sm mx-auto w-full">
                            <div>
                              <div className="text-[#E6C15B] text-lg font-bold">2s</div>
                              <div className="text-[#F5E9C8] text-xs opacity-80">Load Time</div>
                            </div>
                            <div>
                              <div className="text-[#E6C15B] text-lg font-bold">99</div>
                              <div className="text-[#F5E9C8] text-xs opacity-80">Performance Score</div>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-center gap-2 mt-4">
                          <GoldChevron 
                            direction="left" 
                            disabled={serviceIndex === 0} 
                            onClick={goToPrevService} 
                          />
                          <GoldChevron 
                            direction="right" 
                            disabled={serviceIndex === services.length - 1} 
                            onClick={goToNextService} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <CloseButton onClick={() => setOverlay(null)} />
                </div>
              )}
              {overlay === 'privacy' && (
                <div className="w-full max-w-3xl mx-auto flex flex-col px-4 items-center">
                  <h2 className="text-3xl md:text-4xl mb-6 text-white text-center dm-serif lowercase font-light flex items-center justify-center" style={{ textShadow: '0 0 8px #E6C15B88, 0 0 2px #E6C15B44' }}>
                    privacy policy
                    <span className="inline-block align-middle ml-2"><FaviconIcon size={18} /></span>
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2 text-center">Information We Collect</h3>
                      <p className="text-base md:text-lg font-light leading-relaxed mb-2 text-center" style={{ color: '#F5E9C8', letterSpacing: '0.1em' }}>
                        We collect information you provide directly to us, such as when you contact us via email or through our website forms. This may include your name, email address, company information, and any other details you choose to share.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2 text-center">How We Use Your Information</h3>
                      <p className="text-base md:text-lg font-light leading-relaxed mb-2 text-center" style={{ color: '#F5E9C8', letterSpacing: '0.1em' }}>
                        We use the information we collect to respond to your inquiries, provide our services, improve our offerings, and communicate with you about our services. We do not sell, trade, or otherwise transfer your personal information to third parties.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2 text-center">Data Security</h3>
                      <p className="text-base md:text-lg font-light leading-relaxed mb-2 text-center" style={{ color: '#F5E9C8', letterSpacing: '0.1em' }}>
                        We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                      </p>
                    </div>
                  </div>
                  <CloseButton onClick={() => setOverlay(null)} />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
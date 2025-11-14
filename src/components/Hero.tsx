import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, BarChart3, Database, TrendingUp } from 'lucide-react';

const Hero: React.FC = () => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Transforming Data into Insights';

  useEffect(() => {
    setIsVisible(true);
    
    // Typewriter effect
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (avatarRef.current) {
        const rect = avatarRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const rotateX = (y / rect.height) * 15;
        const rotateY = (x / rect.width) * 15;
        
        avatarRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;
      }
    };

    const handleMouseLeave = () => {
      if (avatarRef.current) {
        avatarRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      }
    };

    const avatar = avatarRef.current;
    if (avatar) {
      avatar.addEventListener('mousemove', handleMouseMove);
      avatar.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (avatar) {
        avatar.removeEventListener('mousemove', handleMouseMove);
        avatar.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div 
          ref={textRef} 
          className={`space-y-8 text-center lg:text-left transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-left' : 'opacity-0'
          }`}
        >
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className={`text-white block ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Hi, I'm
              </span>
              <span className={`bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent block animate-gradient-shift ${
                isVisible ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'
              }`}>
                Yash Goyal
              </span>
            </h1>
            <div className={`text-xl lg:text-2xl text-slate-300 font-light h-8 ${
              isVisible ? 'animate-fade-in-up animate-delay-500' : 'opacity-0'
            }`}>
              <span className="typewriter">{typedText}</span>
            </div>
          </div>

          <p className={`text-lg text-slate-400 max-w-2xl leading-relaxed ${
            isVisible ? 'animate-fade-in-up animate-delay-700' : 'opacity-0'
          }`}>
            Aspiring Data/Business Analyst with expertise in Python, Power BI, and Excel. 
            I create compelling analytics dashboards that drive business decisions.
          </p>

          <div className={`flex flex-wrap gap-4 justify-center lg:justify-start ${
            isVisible ? 'animate-fade-in-up animate-delay-1000' : 'opacity-0'
          }`}>
            <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50 hover-glow animate-float">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-slate-300">Data Analysis</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50 hover-glow animate-float animate-delay-200">
              <Database className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-slate-300">Business Intelligence</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50 hover-glow animate-float animate-delay-400">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm text-slate-300">Dashboard Creation</span>
            </div>
          </div>

          <div className={`flex gap-6 justify-center lg:justify-start ${
            isVisible ? 'animate-bounce-in animate-delay-1000' : 'opacity-0'
          }`}>
            <button 
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-3d bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              View My Work
            </button>
            <button 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-3d border border-slate-600 hover:border-cyan-400 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:text-cyan-400 hover-glow"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* 3D Avatar */}
        <div className={`flex justify-center lg:justify-end ${
          isVisible ? 'animate-scale-in animate-delay-500' : 'opacity-0'
        }`}>
          <div 
            ref={avatarRef}
            className="relative w-80 h-80 transition-transform duration-300 ease-out will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-xl animate-pulse-3d animate-morphing"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border border-slate-700/50 flex items-center justify-center overflow-hidden hover-tilt animate-glow-pulse">
              <div className="w-64 h-64 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-8xl font-bold text-white animate-gradient-shift">
                YG
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 rounded-full"></div>
              
              {/* Floating particles around avatar */}
              <div className="absolute -top-4 -left-4 w-3 h-3 bg-cyan-400 rounded-full animate-particle-float"></div>
              <div className="absolute -top-8 right-8 w-2 h-2 bg-blue-400 rounded-full animate-particle-float animate-delay-300"></div>
              <div className="absolute bottom-4 -right-6 w-4 h-4 bg-purple-400 rounded-full animate-particle-float animate-delay-500"></div>
              <div className="absolute -bottom-6 left-12 w-2 h-2 bg-green-400 rounded-full animate-particle-float animate-delay-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${
        isVisible ? 'animate-bounce-in animate-delay-1000' : 'opacity-0'
      }`}>
        <div className="animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-400 hover:text-cyan-400 transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
};

export default Hero;